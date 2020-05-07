all: pack

pack:
	rm -f nodejs.zip
	zip -r nodejs.zip .