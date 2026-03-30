SHELL := /bin/sh

.PHONY: setup install dev build preview lint clean doctor ci gh-deploy gh-runs gh-watch

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

clean:
	rm -rf dist
