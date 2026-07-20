#!/usr/bin/env bash
set -euo pipefail

SERVER="root@192.248.158.244"
REMOTE_DIR="/var/www/html/theelderlywellness.com"
LOCAL_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "Deploying site from: $LOCAL_DIR"
echo "Target: $SERVER:$REMOTE_DIR"
echo ""

rsync -avz --progress \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude 'deploy/' \
  "$LOCAL_DIR/" "$SERVER:$REMOTE_DIR/"

echo ""
echo "Uploading nginx config..."
scp "$LOCAL_DIR/deploy/nginx-theelderlywellness.conf" "$SERVER:/etc/nginx/sites-available/theelderlywellness.com"

echo ""
echo "Enabling site on server..."
ssh "$SERVER" bash -s <<'REMOTE'
set -euo pipefail
mkdir -p /var/www/html/theelderlywellness.com
chown -R www-data:www-data /var/www/html/theelderlywellness.com
ln -sf /etc/nginx/sites-available/theelderlywellness.com /etc/nginx/sites-enabled/theelderlywellness.com
nginx -t
systemctl reload nginx
echo ""
echo "Site files:"
du -sh /var/www/html/theelderlywellness.com
du -sh /var/www/html/theelderlywellness.com/blogs 2>/dev/null || true
df -h /
REMOTE

echo ""
echo "Done. Test: http://theelderlywellness.com/blogs/"
echo "If DNS points here, run on server: certbot --nginx -d theelderlywellness.com -d www.theelderlywellness.com"
