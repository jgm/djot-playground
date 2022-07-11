all:
	rm -rf dist
	corepack enable
	yarn install
	yarn build
	# files are in dist

upload:
	scp dist/index.html website:djot.net/playground/index.html
	scp -r dist/assets website:djot.net/assets

