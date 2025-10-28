# SOCO Frontend Deployment Guide

## Required Repository Structure

Your GitHub repository MUST have this exact structure:

```
your-repo/
├── client/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── trpc.ts          ← CRITICAL FILE
│   │   │   ├── analytics.ts
│   │   │   ├── analyticsEnhanced.ts
│   │   │   └── utils.ts
│   │   ├── components/
│   │   ├── pages/
│   │   ├── _core/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   │   └── (all public assets)
│   └── index.html
├── patches/
│   └── wouter@3.7.1.patch       ← REQUIRED
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts               ← MUST use __dirname, not import.meta.dirname
├── vercel.json
├── .gitignore
├── .prettierrc
└── .prettierignore
```

## Critical Files Checklist

- [ ] `client/src/lib/trpc.ts` exists
- [ ] `client/src/lib/analytics.ts` exists
- [ ] `client/src/lib/utils.ts` exists
- [ ] `patches/wouter@3.7.1.patch` exists
- [ ] `vite.config.ts` uses `__dirname` (not `import.meta.dirname`)

## Environment Variables in Vercel

Set these in Vercel → Settings → Environment Variables:

1. **VITE_API_URL**
   - Value: `https://sococommx-backend-production.up.railway.app`

2. **VITE_ANALYTICS_ENDPOINT** (optional - for Umami)
   - Value: `https://cloud.umami.is/script.js`

3. **VITE_ANALYTICS_WEBSITE_ID** (optional - for Umami)
   - Value: `130a67e5-7169-43ea-9bbd-251c918bb27e`

## Troubleshooting

### Error: "Rollup failed to resolve import @/lib/trpc"

**Cause**: The `client/src/lib/trpc.ts` file is missing from your repository.

**Solution**: 
1. Verify the file exists in your local copy
2. Make sure it's not in `.gitignore`
3. Commit and push: `git add client/src/lib/ && git commit -m "Add lib files" && git push`

### Error: "patchedDependencies configuration doesn't match"

**Cause**: The `patches/` directory is missing or `pnpm-lock.yaml` is out of sync.

**Solution**:
1. Ensure `patches/wouter@3.7.1.patch` exists
2. In Vercel Build Settings, set Install Command to: `pnpm install --no-frozen-lockfile`

### Error: "import.meta.dirname is undefined"

**Cause**: The `vite.config.ts` file uses `import.meta.dirname` which isn't available in Node.js.

**Solution**: Update `vite.config.ts` to use `__dirname` with `fileURLToPath`:

```typescript
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

## Deployment Steps

1. **Extract the zip file** you received
2. **Delete all files** in your GitHub repository
3. **Upload all files** from the `soco-frontend-deploy/` folder to your repository root
4. **Commit and push** to GitHub
5. Vercel will automatically detect the changes and redeploy

## Verification

After deployment, your site should be live at your Vercel URL. Check:
- Homepage loads correctly
- 3D visualizations work
- Language switching (EN/ES) works
- Analytics tracking is active (check Network tab for API calls)

