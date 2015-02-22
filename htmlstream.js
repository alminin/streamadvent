var trumpet = require('trumpet');
var through = require('through');

var to_upper = through(function (buf) {
	this.queue(buf.toString().toUpperCase());
})

var tr = trumpet();

var stream = tr.select('.loud').createStream();
stream.pipe(to_upper).pipe(stream);

process.stdin.pipe(tr).pipe(process.stdout);


