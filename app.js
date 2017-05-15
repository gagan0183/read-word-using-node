var textract = require('textract');

textract.fromFileWithPath('AllBooksNames.docx',  {preserveLineBreaks:true}, function(error, text) {
    console.log(text);
});

textract.fro