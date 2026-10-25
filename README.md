# Padhaai Neev

Class 10 study prototype: Basic Neev diagnostics, question solving, topper answers, and a 2026–27 sample paper.

This is the real project source (React 19, TanStack Start, Vite, Tailwind). It is not a saved copy of the browser page.

## Run locally

You need Node.js 22.

```bash
npm install
npm run dev
```

Open http://localhost:8080

`npm run build` makes the production build. `npm run typecheck` checks TypeScript.

Auth and the database are off. Question banks live in `src/data/`. The app UI is in `src/routes/` and `src/components/`.

## Put it on GitHub

There is no separate one-click export in this chat. Download this zip, unzip it, then:

```bash
git init
git add .
git commit -m "Padhaai Neev hackathon prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

Do not commit `node_modules`. It is recreated by `npm install`.
