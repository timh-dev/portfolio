SHELL := /bin/sh

.PHONY: setup install dev build preview lint clean doctor ci gh-deploy gh-runs gh-watch gh-sync-vars gh-sync-vercel

setup: install

install:
	npm install

dev:
	npm run dev -- --host

build:
	npm run build

preview:
	npm run preview -- --host

lint:
	npm run lint

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

gh-sync-vercel:
	@test -f .vercel/project.json || { echo ".vercel/project.json not found — run 'vercel' first"; exit 1; }
	@ORG_ID=$$(node -p "require('./.vercel/project.json').orgId"); \
	PROJECT_ID=$$(node -p "require('./.vercel/project.json').projectId"); \
	gh secret set VERCEL_ORG_ID --body "$$ORG_ID"; \
	gh secret set VERCEL_PROJECT_ID --body "$$PROJECT_ID"; \
	echo "Set VERCEL_ORG_ID and VERCEL_PROJECT_ID from .vercel/project.json"
	@echo "Now enter your Vercel token (create at https://vercel.com/account/tokens):"
	@read -s VERCEL_TOKEN && gh secret set VERCEL_TOKEN --body "$$VERCEL_TOKEN" && echo "Set VERCEL_TOKEN"

clean:
	rm -rf dist
