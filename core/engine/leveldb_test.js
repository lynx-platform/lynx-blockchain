var fs = require('fs');
var exec = require('child_process').exec;
var Storage = require('./Storage.js');

var storage = new Storage('./leveldb');

var key = process.argv[2];
var value = fs.readFileSync(key, 'utf8');
//console.log(value);

//storage.store(key, value);

storage.load(key, function(value) {
    console.log(value);
    eval('console.log("test");');
    eval(value);
});

var child = exec('node ' + key, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
