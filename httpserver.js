var http = require("http");
var through = require("through");

var server = http.createServer(function (req, res) {
	if (req.method === 'POST') {
	req.pipe(through(function (data) {
	this.queue(data.toString().toUpperCase());
})).pipe(res);
}
else res.end("send me a POST \n");
});
server.listen(process.argv[2]);