import os
import shutil
import re

def main():
    # 1. Copy 404.html to blogs/404.html and blogs/404.php
    if os.path.exists('404.html'):
        os.makedirs('blogs', exist_ok=True)
        
        # Read 404.html and adjust relative asset paths for blogs subdirectory
        with open('404.html', 'r', encoding='utf-8') as f:
            blog_404_content = f.read()

        blog_404_content = blog_404_content.replace('href="images/', 'href="../images/')
        blog_404_content = blog_404_content.replace('src="images/', 'src="../images/')
        blog_404_content = blog_404_content.replace('href="css/', 'href="../css/')
        blog_404_content = blog_404_content.replace('href="js/', 'href="../js/')
        blog_404_content = blog_404_content.replace('href="index.html"', 'href="../index.html"')
        blog_404_content = blog_404_content.replace('href="services.html"', 'href="../services.html"')
        blog_404_content = blog_404_content.replace('href="about.html"', 'href="../about.html"')
        blog_404_content = blog_404_content.replace('href="pricing.html"', 'href="../pricing.html"')
        blog_404_content = blog_404_content.replace('href="contact.html"', 'href="../contact.html"')
        blog_404_content = blog_404_content.replace('href="physiotherapy-services-for-elders.html"', 'href="../physiotherapy-services-for-elders.html"')
        blog_404_content = blog_404_content.replace('href="nursing-services-for-elders.html"', 'href="../nursing-services-for-elders.html"')
        blog_404_content = blog_404_content.replace('href="geriatric-care-services-for-elders.html"', 'href="../geriatric-care-services-for-elders.html"')
        blog_404_content = blog_404_content.replace('href="assisted-living-support-services-for-elders.html"', 'href="../assisted-living-support-services-for-elders.html"')

        with open('blogs/404.html', 'w', encoding='utf-8') as f:
            f.write(blog_404_content)
        print("Created blogs/404.html")

        with open('blogs/404.php', 'w', encoding='utf-8') as f:
            f.write(blog_404_content)
        print("Created blogs/404.php")

    # 2. Update deploy/nginx-theelderlywellness.conf
    nginx_path = 'deploy/nginx-theelderlywellness.conf'
    if os.path.exists(nginx_path):
        with open(nginx_path, 'r', encoding='utf-8') as f:
            n_content = f.read()
        if 'error_page 404' not in n_content:
            n_content = n_content.replace(
                'root /var/www/html/theelderlywellness.com;',
                'root /var/www/html/theelderlywellness.com;\n    error_page 404 /404.html;'
            )
            with open(nginx_path, 'w', encoding='utf-8') as f:
                f.write(n_content)
            print("Updated nginx config with error_page 404 /404.html")

    # 3. Create .htaccess for Apache environments
    htaccess_content = '''# Custom 404 Error Document
ErrorDocument 404 /404.html

# Enable Rewrite Engine
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
</IfModule>
'''
    with open('.htaccess', 'w', encoding='utf-8') as f:
        f.write(htaccess_content)
    print("Created .htaccess with ErrorDocument 404 /404.html")

if __name__ == '__main__':
    main()
