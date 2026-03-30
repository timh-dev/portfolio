SHELL := /bin/zsh

.PHONY: install dev build preview lint clean

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

clean:
	rm -rf dist
