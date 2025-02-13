.PHONY: build

build:
	@echo "Building with esbuild"
	@node esbuild.config.mjs
