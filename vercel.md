# Vercel deployment

The AZ Learning site is a Vite single-page React application. The included
`vercel.json` sets the production build and rewrites application routes to
`index.html`, so direct visits to routes such as `/syllabus`, `/contact`, and
`/whiteboard` work correctly.

## Deploy from the Vercel dashboard

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected framework as **Vite**.
4. Confirm these settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
5. Select **Deploy**.

No environment variables or backend services are required.

## Deploy with the Vercel CLI

From the project root:

```bash
npx vercel
```

For a production deployment:

```bash
npx vercel --prod
```

## Verify before deployment

```bash
npm install
npm run build
npm run preview
```

After deployment, verify the home page, navigation, theme toggle, WhatsApp
links, syllabus accordions, interview accordions, and whiteboard. Also open a
nested route directly in a fresh browser tab to confirm the SPA rewrite.
# Deploy AZ Learning on Vercel

Frontend-only Vite + React app. No environment variables and no backend.

## 1. Push the repo

```bash
git init
git add .
git commit -m "AZ Learning site"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

Do not commit `node_modules` or `dist` (already in `.gitignore`).

## 2. Import in Vercel

1. Open [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New… → Project** and select this repository.
3. Vercel should detect **Vite**. Confirm:

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `./` (repo root) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

4. Click **Deploy**. No env vars are required.

`vercel.json` already rewrites all routes to `index.html` so `/syllabus`, `/whiteboard`, and the rest work on refresh.

## 3. CLI (optional)

```bash
npm i -g vercel
npm install
npm run build
vercel
```

Production:

```bash
vercel --prod
```

## 4. Local check before deploy

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Then:

```bash
npm run build
npm run preview
```

## 5. After deploy

- Custom domain: Vercel project → **Settings → Domains**.
- WhatsApp links use the numbers in `src/data/contacts.js`.
- Theme preference is stored in the browser (`az-theme`). Nothing is stored on a server.

## 6. If the whiteboard chunk is large

Excalidraw is lazy-loaded. First visit to `/whiteboard` may take a moment. That is expected.
