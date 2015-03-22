var tar = require('tar');
var crypto = require('crypto');
var through = require('through');
var zlib = require('zlib');

var parser = tar.Parse();

parser.on('entry', function (entry) {
	if (entry.type !== 'File') return;

	entry
	.pipe(crypto.createHash('md5', { encoding : 'hex'}))
	.pipe(through(function (data) {
		this.queue(data.toString() + ' ' + entry.path + '\n');
	}))
	.pipe(process.stdout);
});

process.stdin
.pipe(crypto.createDecipher(process.argv[2], process.argv[3]))
.pipe(zlib.createGunzip())
.pipe(parser);