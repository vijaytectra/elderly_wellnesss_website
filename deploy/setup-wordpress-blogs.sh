#!/usr/bin/env bash
# Run this ON THE SERVER (ssh root@192.248.158.244)
# Installs WordPress at /blogs/ using existing wordpress_blogs database
set -euo pipefail

SITE_ROOT="/var/www/html/theelderlywellness.com"
BLOGS_DIR="$SITE_ROOT/blogs"
BACKUP_DIR="$SITE_ROOT/blogs-static-backup-$(date +%Y%m%d-%H%M)"
NGINX_CONF="/etc/nginx/sites-available/theelderlywellness.com"

DB_NAME="wordpress_blogs"
DB_USER="${DB_USER:-wordpress}"
DB_PASS="${DB_PASS:-}"
WP_URL="https://theelderlywellness.com/blogs"

echo "=== WordPress /blogs/ setup ==="

if [[ -z "$DB_PASS" ]]; then
  echo "Set database password first, e.g.:"
  echo "  export DB_USER=wordpress"
  echo "  export DB_PASS='your_mysql_password'"
  echo ""
  echo "Find credentials: grep -E 'DB_|password' /var/www/html/tectratechnologies.com/wp-config.php 2>/dev/null"
  echo "Or create user: mysql -e \"CREATE USER IF NOT EXISTS 'wordpress'@'localhost' IDENTIFIED BY 'PASSWORD'; GRANT ALL ON wordpress_blogs.* TO 'wordpress'@'localhost'; FLUSH PRIVILEGES;\""
  exit 1
fi

# 1. Backup static blogs
if [[ -d "$BLOGS_DIR" && ! -f "$BLOGS_DIR/wp-config.php" ]]; then
  echo "Backing up static blogs to $BACKUP_DIR"
  mv "$BLOGS_DIR" "$BACKUP_DIR"
fi

mkdir -p "$BLOGS_DIR"

# 2. Download WordPress
echo "Downloading WordPress..."
cd /tmp
curl -fsSL -o wordpress.tar.gz https://wordpress.org/latest.tar.gz
tar xzf wordpress.tar.gz
rsync -a wordpress/ "$BLOGS_DIR/"
rm -rf wordpress wordpress.tar.gz

# 3. Restore media, themes, and plugins from static backup
if [[ -d "$BACKUP_DIR/wp-content" ]]; then
  echo "Restoring wp-content from static backup..."
  mkdir -p "$BLOGS_DIR/wp-content"
  for dir in uploads themes plugins; do
    if [[ -d "$BACKUP_DIR/wp-content/$dir" ]]; then
      cp -a "$BACKUP_DIR/wp-content/$dir" "$BLOGS_DIR/wp-content/"
    fi
  done
fi

# 4. wp-config.php
SALT=$(curl -fsSL https://api.wordpress.org/secret-key/1.1/salt/)
cat > "$BLOGS_DIR/wp-config.php" <<EOF
<?php
define('DB_NAME', '$DB_NAME');
define('DB_USER', '$DB_USER');
define('DB_PASSWORD', '$DB_PASS');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

\$table_prefix = 'wp_';

define('WP_HOME', '$WP_URL');
define('WP_SITEURL', '$WP_URL');

define('WP_DEBUG', false);

$SALT

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}
require_once ABSPATH . 'wp-settings.php';
EOF

# 5. Permissions
chown -R www-data:www-data "$BLOGS_DIR"
find "$BLOGS_DIR" -type d -exec chmod 755 {} \;
find "$BLOGS_DIR" -type f -exec chmod 644 {} \;

# 6. Nginx (copy from deploy folder or inline)
if [[ -f "$SITE_ROOT/../deploy/nginx-theelderlywellness.conf" ]]; then
  cp "$SITE_ROOT/../deploy/nginx-theelderlywellness.conf" "$NGINX_CONF"
else
  echo "Update nginx manually — see deploy/nginx-theelderlywellness.conf in repo"
fi

# If nginx conf was uploaded to /root:
if [[ -f /root/nginx-theelderlywellness.conf ]]; then
  cp /root/nginx-theelderlywellness.conf "$NGINX_CONF"
fi

nginx -t && systemctl reload nginx

# 7. Sync URLs in database (if tables already exist)
mysql "$DB_NAME" -e "
UPDATE wp_options SET option_value='$WP_URL' WHERE option_name IN ('siteurl','home');
" 2>/dev/null || echo "DB tables not ready yet — complete WP install in browser"

echo ""
echo "=== Done ==="
echo "1. Open: http://theelderlywellness.com/blogs/wp-admin/"
echo "2. If DB has old posts, login with existing WP admin credentials"
echo "3. If fresh install screen appears, use existing DB — do NOT create new tables"
echo "4. SSL: certbot --nginx -d theelderlywellness.com -d www.theelderlywellness.com"
echo "Static backup kept at: $BACKUP_DIR"
