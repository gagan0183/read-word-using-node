var textract = require('textract');
var fs = require('fs');
var request = require('sync-request');

textract.fromFileWithPath('AllBooksNames.docx',  {preserveLineBreaks:true}, function(error, text) {
   fs.readFile('All.txt', {"encoding": "utf-8"}, function(err, data) {
        if(err) {
            throw err;
        }
        var bookNames = data.split("\n");
        var count = 1;
        bookNames.forEach(function(element) {
            var parts = element.split("-");
            var data = {
                "isbn": "isbn-" + count,
                "bookName": parts[0].trim(),
                "type": parts[2].trim(),
                "author": parts[1].trim(),
                "startDate": "2016-09-09",
                "completeDate": "2016-09-09",
                "revision": false
            };
            var res = request('POST', 'http://192.168.1.153:8080/book', {
                json: data,
                'headers': {
                    'Access-Control-Allow-Origin': 'http://192.168.1.153:8080'
                }
            });
            console.log("response : " + res.getBody());
            console.log("count : " + count);
            count++;
        });
    });
});
