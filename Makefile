all:
	corepack enable
	yarn install
	yarn build
	# files are in dist
