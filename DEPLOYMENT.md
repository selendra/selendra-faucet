# Deployment Guide

This guide explains how to deploy the Selendra Faucet with frontend on Vercel and backend on koompi.cloud.

## Architecture

- **Frontend**: React + Vite hosted on Vercel
- **Backend**: Express.js API hosted on koompi.cloud

## Backend Deployment (koompi.cloud)

### 1. Prerequisites

- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy

### 2. Setup Environment Variables

Create `.env` file on your server:

```bash
PORT=3001
FAUCET_PRIVATE_KEY=your-private-key-here
```

### 3. Install Dependencies & Build

```bash
npm install
npm run build:server
```

### 4. Start Server with PM2

```bash
pm2 start dist/server/index.js --name selendra-faucet
pm2 save
pm2 startup
```

### 5. Configure Nginx

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
    }
}
```

### 6. Enable HTTPS with Let's Encrypt

```bash
sudo certbot --nginx -d faucet-api.selendra.org
```

## Frontend Deployment (Vercel)

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2. Configure Environment Variables

Add to Vercel Environment Variables:

```
VITE_API_URL=https://faucet-api.selendra.org
```

### 3. Deploy

Click "Deploy" - Vercel will automatically build and deploy your frontend.

## Testing

### Backend Health Check

```bash
curl https://faucet-api.selendra.org/api/health
```

Expected response:

```json
{
  "status": "ok",
  "networks": {
    "mainnet": {...},
    "testnet": {...}
  }
}
```

### Frontend

Visit your Vercel URL (e.g., `https://your-app.vercel.app`) and test:

1. Connect wallet
2. Switch networks
3. Request tokens

## Environment Variables Reference

### Backend (.env on koompi.cloud)

- `PORT`: Server port (default: 3001)
- `FAUCET_PRIVATE_KEY`: Private key for both networks

### Frontend (Vercel Environment Variables)

- `VITE_API_URL`: Backend API URL (https://faucet-api.selendra.org)

## Monitoring

### Backend Logs

```bash
pm2 logs selendra-faucet
```

### Vercel Logs

Check logs in Vercel Dashboard under "Deployments" → Select deployment → "Logs"

## Troubleshooting

### CORS Issues

If you get CORS errors, ensure your backend allows requests from your Vercel domain:

```typescript
// server/index.ts
app.use(
  cors({
    origin: ["https://your-app.vercel.app"],
    credentials: true,
  })
);
```

### API Connection Failed

- Verify `VITE_API_URL` is set correctly in Vercel
- Check backend is running: `pm2 status`
- Test backend directly: `curl https://faucet-api.selendra.org/api/info`
