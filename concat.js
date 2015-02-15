var concat = require('concat-stream');

process.stdin
	.pipe(concat(function (buf) {
		var s = buf.toString().split('').reverse().join('');
		process.stdout.write(s);
	}));