var textract = require('textract');
var fs = require('fs');
var request = require('sync-request');

textract.fromFileWithPath('certifications.docx',  {preserveLineBreaks:true}, function(error, text) {
   var line = text.split("\n");
   var textwritetxt = "";

   for(var p = 0; p < line.length; p++) {
        var l = line[p].split(" ");
        var textwrite = "";
        for(var i = 1; i < l.length; i++) {
            textwrite += l[i] + " ";
        }
        textwritetxt += textwrite + "\n";
    }
     

     fs.writeFile('certifications.txt', textwritetxt, function(err) {
        if(err) {
            throw err;
        }
    });
});