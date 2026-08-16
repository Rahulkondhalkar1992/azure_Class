# VedX AI Platform

One Vercel-ready package containing:

- Premium VedX AI website at `/`
- Existing Azure Learning Portal at `/azure-learning`

## Local development

```bash
# VedX AI (Next.js)
npm run dev:vedx

# Azure Learning (Vite)
npm run dev:learning
```

The local Azure Learning dev server runs at `/azure-learning/`.

## Production build

```bash
npm install
npm --prefix vedx install
npm run build
```

The build combines both applications into `combined-dist`.

## Vercel

Import the repository and keep:

- Build command: `npm run build`
- Output directory: `combined-dist`
- Install command: `npm install && npm --prefix vedx install`

`vercel.json` preserves static files and routes Azure Learning SPA pages back to
`/azure-learning/index.html`.