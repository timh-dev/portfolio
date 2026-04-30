# Portfolio

Single-page portfolio site built with React, Vite, Tailwind CSS, and shadcn-style UI primitives. The site is configured for GitHub Pages deployment through GitHub Actions.

## Local development

```bash
cp .env.template .env
make install
make dev
```

## GitHub Actions env setup

For the Pages workflow, define these repository variables in GitHub under `Settings > Secrets and variables > Actions > Variables`:

- `VITE_DISPLAY_NAME`
- `VITE_INITIALS`
- `VITE_EMAIL`
- `VITE_GITHUB_URL`
- `VITE_ROLE`

The workflow writes those values into a temporary `.env` file before building.

If you already have a local `.env`, you can sync those values to GitHub with:

```bash
make gh-sync-vars
```

This requires `gh` to be installed and authenticated for the repository.

## Quality and build

```bash
make lint
make build
make preview
```

## Content

Update portfolio content in `src/data/site.ts`.
Set personal values in `.env` using `.env.template` as the starting point.
