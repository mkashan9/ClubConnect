# Deployment Guide

This guide covers deploying ClubConnect to various platforms and environments.

## Prerequisites

- Web server with HTTP/HTTPS support
- Domain name (recommended for production)
- SSL/TLS certificate (required for production)
- Basic understanding of web server configuration

## Local Development

### Using Python

```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

### Using Node.js

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000

# Or using npx (no installation needed)
npx http-server -p 8000
```

### Using Ruby

```bash
ruby -run -ehttpd . -p8000
```

## Production Deployment

### GitHub Pages (Static Hosting)

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select the branch to deploy (usually `main`)
4. Save and GitHub will build your site
5. Access at `https://yourusername.github.io/clubconnect`

**Limitations**: No server-side processing; blockchain functionality requires client-side Web3 integration only.

### Netlify

1. Connect your GitHub repository
2. Configure build settings (optional for static sites)
3. Deploy with one click
4. Custom domain configuration available

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Vercel

1. Import your GitHub repository
2. Vercel automatically detects static site
3. Deploy is instant
4. Custom domain available

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Traditional Web Hosting (Apache/Nginx)

#### Apache

1. Upload files to your web root (typically `/public_html`)
2. Create `.htaccess` for URL rewriting if needed:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

3. Configure HTTPS in your hosting control panel

#### Nginx

1. Upload files to your web root (typically `/var/www/clubconnect`)
2. Configure server block:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/clubconnect;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/css application/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. Enable HTTPS using Let's Encrypt:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `default.conf`:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:

```bash
docker build -t clubconnect .
docker run -p 80:80 clubconnect
```

## Configuration for Production

### Environment Variables

Create `.env` file in your project root (add to `.gitignore`):

```env
# Blockchain Configuration
VITE_OWNER_WALLET="0xe2d165ab23cd2ed0cafb969b8bc55b9a71f17b5c"
VITE_SEPOLIA_CHAIN_ID="0xaa36a7"
VITE_POLYGON_CHAIN_ID="0x89"
VITE_PAYMENT_AMOUNTS_PLAYER="0.01"
VITE_PAYMENT_AMOUNTS_COACH="0.02"
VITE_PAYMENT_AMOUNTS_CLUB="0.05"

# API Endpoints (if you add backend)
VITE_API_URL="https://api.yourdomain.com"
```

### Security Headers

Add to your web server configuration:

```nginx
# Security Headers for Nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# CSP - Adjust URLs as needed
add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;" always;
```

### Performance Optimization

1. **Enable Compression**:
```nginx
gzip on;
gzip_types text/css application/javascript;
gzip_vary on;
```

2. **Cache Static Assets**: Set long expiration times for images, CSS, JS

3. **Minify CSS and JavaScript**:
```bash
# Using npm tools
npm install --save-dev terser cssnano
```

4. **Optimize Images**: Use modern formats (WebP) and compress

## Monitoring & Maintenance

### Health Checks

Implement basic health check endpoint or manually verify:
- Page loads correctly
- All assets load
- Console shows no errors
- Blockchain integration works (if applicable)

### Logs

Monitor server logs for errors:
- `access.log` - Track usage
- `error.log` - Debug issues
- Browser console - Check client-side errors

### Backups

Set up automated backups:
```bash
# Daily backup
0 2 * * * tar -czf /backups/clubconnect-$(date +\%Y\%m\%d).tar.gz /var/www/clubconnect
```

## SSL/TLS Certificate

### Let's Encrypt (Free)

```bash
# For Nginx
sudo certbot --nginx -d yourdomain.com

# For Apache
sudo certbot --apache -d yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

### Update HTTP to HTTPS

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    # ... rest of configuration
}
```

## Troubleshooting

### 404 Errors on Page Reload
**Solution**: Configure server to serve `index.html` for all non-file requests

### CORS Errors
**Solution**: Configure proper CORS headers if you have a backend API

### Blockchain Integration Issues
1. Verify MetaMask is installed
2. Check correct network is selected
3. Verify wallet address is correct
4. Test on testnet before mainnet

### Performance Issues
1. Check file compression is enabled
2. Verify caching headers are set
3. Optimize images
4. Use CDN for static assets

## Support

For deployment-specific issues:
1. Check server logs
2. Review browser console for errors
3. Refer to [CONTRIBUTING.md](CONTRIBUTING.md) for reporting bugs
4. Contact support via [contact.html](contact.html)

---

**Happy deploying! 🚀**
