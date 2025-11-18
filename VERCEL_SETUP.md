# Vercel Deployment Setup

## Important: Environment Variable Required

The Vercel deployment requires the `VITE_API_URL` environment variable to be set.

### Steps to Configure:

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select the `selendra-faucet` project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:

   ```
   Name: VITE_API_URL
   Value: https://faucet-api.selendra.org
   ```

5. Select environments: **Production**, **Preview**, and **Development**
6. Click **Save**
7. Go to **Deployments** tab
8. Click the **⋯** menu on the latest deployment
9. Select **Redeploy** to rebuild with the new environment variable

## Verification

After redeployment:

1. Visit your Vercel URL: https://selendra-faucet-git-main-rithys-projects-2e6336a3.vercel.app/
2. Open browser console (F12)
3. Check the Network tab - API calls should go to `https://faucet-api.selendra.org`
4. Test connecting wallet and requesting tokens

## Troubleshooting

### Issue: Still showing old version

**Solution:** Vercel caches builds. Force a fresh deployment:
- Delete the current deployment
- Trigger a new deployment by pushing a commit or clicking "Redeploy" with "Use existing build cache" unchecked

### Issue: API calls fail with CORS errors

**Solution:** Ensure the backend at `faucet-api.selendra.org` has CORS configured to allow your Vercel domain:

```javascript
// In server/index.ts
app.use(cors({
  origin: [
    'https://selendra-faucet.vercel.app',
    'https://selendra-faucet-git-main-rithys-projects-2e6336a3.vercel.app'
  ]
}));
```

### Issue: Build fails

**Solution:** Check Vercel build logs for errors. Common issues:
- Missing dependencies in package.json
- TypeScript errors
- Environment variable not set

## Custom Domain Setup (Optional)

To use a custom domain like `faucet.selendra.org`:

1. Go to **Settings** → **Domains**
2. Add `faucet.selendra.org`
3. Add DNS records as instructed by Vercel
4. Update backend CORS to include the custom domain
