var duplexer = require('duplexer');
var spawn = require('child_process').spawn;

module.exports = function (cmd, args) {
	var proc = spawn(cmd, args);
	return duplexer(proc.stdin, proc.stdout);
}