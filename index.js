var express = require('express');
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var upload = multer({ dest: './uploads/' });

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.post('/', upload.single('userFile'), function(req, res) {
    console.log(req.file);
    console.log(req.body.userFileName);
    var tempPath = req.file.path.toString();
    var customFileName = req.body.userFileName;
    var extName = path.extname(req.file.originalname.toString());

    fs.rename(tempPath, 'uploads/' + customFileName + extName, function(err) {
        if(err) {
            console.log(err);
        }
        console.log('File renamed!');
        res.end('got file?');
    });
});

app.listen(3000, function(){
  console.log('Running on port 3000');
});
