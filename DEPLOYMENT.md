# Deployment Guide

This guide explains how to deploy the Selendra Faucet application.

## Architecture

The application consists of two parts:
1. **Frontend** - Static React app (deployed on Vercel)
2. **Backend** - Node.js API server (deployed on VPS/Docker)

## Frontend Deployment (Vercel)

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import `selendra/selendra-faucet` repository
4. Vercel will auto-detect the configuration from `vercel.json`

### 2. Add Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
Name: VITE_API_URL
Value: https://your-backend-api-url.com/api
Environments: Production, Preview, Development
```

**Example:** If your backend is at `https://faucet-api.selendra.org`, set:
```
VITE_API_URL=https://faucet-api.selendra.org/api
```

### 3. Deploy

- Vercel will automatically deploy on every push to `main` branch
- Manual deployment: Click "Deploy" in Vercel Dashboard

## Backend Deployment (Docker)

### 1. Prepare Environment Variables

On your server, create a `.env` file:

```bash
PORT=3001
FAUCET_PRIVATE_KEY=your-private-key-here
```

### 2. Build and Run with Docker

```bash
# Build the Docker image
docker build -t selendra-faucet .

# Run the container
docker run -d \
  --name selendra-faucet \
  -p 3001:3001 \
  --env-file .env \
  --restart unless-stopped \
  selendra-faucet
```

### 3. Setup Nginx Reverse Proxy (Optional)

Create `/etc/nginx/sites-available/faucet-api`:

```nginx
server {
    listen 80;
    server_name faucet-api.selendra.org;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/faucet-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Setup SSL with Certbot

```bash
sudo certbot --nginx -d faucet-api.selendra.org
```

## Alternative Backend Deployment Options

### Railway
1. Connect GitHub repository
2. Add environment variables in Railway dashboard
3. Deploy automatically

### Heroku
```bash
heroku create selendra-faucet-api
heroku config:set FAUCET_PRIVATE_KEY=your-key
git push heroku main
```

### VPS (PM2)
```bash
npm install -g pm2
npm run build:full
pm2 start dist/server/index.js --name faucet-api
pm2 save
pm2 startup
```

## Environment Variables Summary

### Frontend (Vercel)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://faucet-api.selendra.org/api` |

### Backend (Docker/VPS)
| Variable | Description | Required |
|----------|-------------|----------|
| `FAUCET_PRIVATE_KEY` | Faucet wallet private key | Yes |
| `PORT` | Server port | No (default: 3001) |

## Verification

1. Frontend: Visit your Vercel URL (e.g., `https://selendra-faucet.vercel.app`)
2. Backend: Check health endpoint: `https://your-api-url.com/api/health`
3. Test faucet functionality by connecting wallet and requesting tokens

## Troubleshooting

### CORS Issues
Ensure backend CORS is configured to allow your Vercel frontend domain.

### API Connection Failed
1. Verify `VITE_API_URL` is set correctly in Vercel
2. Check backend is running: `curl https://your-api-url.com/api/info`
3. Check browser console for errors

### Rate Limiting
Users are rate-limited per network:
- Testnet: 1 request per 24 hours
- Mainnet: 1 request per 1 hour
