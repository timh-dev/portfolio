# Tim Holmes Portfolio

Single-page portfolio site built with React, Vite, Tailwind CSS, and shadcn-style UI primitives. The site is configured for GitHub Pages deployment through GitHub Actions.

## Local development

```bash
cp .env.template .env
make install
make dev
```

## Quality and build

```bash
make lint
make build
make preview
```

## Content

Update portfolio content in `src/data/site.ts`.
Set personal values in `.env` using `.env.template` as the starting point.
