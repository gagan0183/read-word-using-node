var textract = require('textract');
var fs = require('fs');
var request = require('sync-request');

textract.fromFileWithPath('certifications.docx',  {preserveLineBreaks:true}, function(error, text) {
   fs.readFile('certifications.txt', {"encoding": "utf-8"}, function(err, data) {
        if(err) {
            throw err;
        }
        var bookNames = data.split("\n");
        var count = 1;
        bookNames.forEach(function(element) {
            var parts = element.split(",");
            var data = {
                "certificationName": parts[0].trim(),
                "certificationDate": parts[2].trim(),
                "certificationProvider": parts[1].trim(),
                "difficultyLevel": "medium",
                "certificationType": parts[3].trim(),
                "certificatePrint": false,
                "revision": false
            };
            var res = request('POST', 'http://192.168.1.153:8080/certification', {
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
