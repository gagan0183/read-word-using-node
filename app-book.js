var textract = require('textract');
var fs = require('fs');
var request = require('sync-request');

textract.fromFileWithPath('AllBooksNames.docx',  {preserveLineBreaks:true}, function(error, text) {
   fs.readFile('052017.txt', {"encoding": "utf-8"}, function(err, data) {
        if(err) {
            throw err;
        }
        var bookNames = data.split("\n");
        var count = 1;
        bookNames.forEach(function(element) {
            var parts = element.split(",");
            var data = {
                "isbn": parts[4].trim(),
                "bookName": parts[0].trim(),
                "type": parts[2].trim(),
                "author": parts[1].trim(),
                "startDate": parts[3].trim(),
                "completeDate": parts[3].trim(),
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
