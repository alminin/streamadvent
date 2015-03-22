var combine = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

module.exports = function () {
    var result;

    var tr = through(function (line) {
        if (line.length === 0) return;

        var row = JSON.parse(line)

        if (row.type === 'genre') {
            if (result) {
                this.queue(JSON.stringify(result) + '\n');
            }
            result = {'name': row.name, 'books': []};
        } else if (row.type === 'book') {
            result.books.push(row.name);
        } 
    }, function () {
        if (result) {
            this.queue(JSON.stringify(result) + '\n');
        }
        this.queue(null);
    });

    return combine(
        split(),
        tr,
        zlib.createGzip()
    )
}