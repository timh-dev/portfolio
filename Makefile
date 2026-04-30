SHELL := /bin/sh

.PHONY: setup install dev build preview lint clean doctor ci gh-deploy gh-runs gh-watch gh-sync-vars vercel-deploy

setup: install

install:
	pnpm install

dev:
	pnpm dev -- --host

build:
	pnpm build

preview:
	pnpm preview -- --host

lint:
	pnpm lint

ci: lint build

doctor:
	node -v
	npm -v

gh-deploy:
	gh workflow run .github/workflows/deploy.yml

gh-runs:
	gh run list --workflow .github/workflows/deploy.yml

gh-watch:
	gh run watch

gh-sync-vars:
	@test -f .env || { echo ".env file not found"; exit 1; }
	@set -a; . ./.env; set +a; \
	gh variable set VITE_DISPLAY_NAME --body "$$VITE_DISPLAY_NAME"; \
	gh variable set VITE_INITIALS --body "$$VITE_INITIALS"; \
	gh variable set VITE_EMAIL --body "$$VITE_EMAIL"; \
	gh variable set VITE_GITHUB_URL --body "$$VITE_GITHUB_URL"; \
	gh variable set VITE_ROLE --body "$$VITE_ROLE"

vercel-deploy:
	npx vercel build --prod
	npx vercel deploy --prebuilt --prod

clean:
	rm -rf dist .vercel/output
