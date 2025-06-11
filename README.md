# Camlin

Frontend interview entry for Camlin Group

# Getting started (Local)

```bash
git clone <repo-url>
cd camlin
npm install
npm run prepare # to install husky scripts needed for pre-commit hook
npm run dev   # Runs on http://localhost:5173 by default
```

# Building for production

```bash
npm run build
npm run preview   # optional: preview production build locally, runs on http://localhost:4173/ by default
```

# Docker

```bash
docker build -t transformer-dashboard .
docker run -d -p 8080:80 transformer-dashboard # Visit http://localhost:8080 to see it
```
