all:
	rm -rf dist
	corepack enable
	yarn install
	yarn build
	# files are in dist

copy:
	cp dist/index.html $$HOME/web/djot.net/playground/
	cp -r dist/assets $$HOME/web/djot.net/playground/

#upload:
#	scp dist/index.html website:djot.net/playground/index.html
#	scp -r dist/assets website:djot.net/playground/
#	scp ../djot/doc/syntax.html website:djot.net/
#
