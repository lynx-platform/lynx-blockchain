var fs = require('fs');
var SHA256 = require('crypto-js/sha256');
var exec = require('child_process').exec;
var Storage = require('./Storage.js');

class Engine {
    constructor(name, callback) {
        // Program Table
        // this.pgmTable = [];
        // Test
        //this.pgmTable = [
        //    {address: '0', body: 'console.log("Hello World!")'}
        //];
        this.storage = new Storage(name);
        if (callback) callback();
    }

    // TODO: fail if a program has been deployed
    deploy(path, constructor) {
        let code = fs.readFileSync(path, 'utf8');
        let name = path.replace(/^.*[\\\/]/, '');
        let address = SHA256(name + code).toString();
        console.log('name: ' + name);
        console.log('address: ' + address);

        let state = typeof constructor === 'function' ? eval('(' + String(constructor) + ')()') : constructor;
        console.log('state:\n' + state);

        this.storage.store(address, state, function() {
            fs.writeFile('storage/' + address + '.js', code, function(err) {
                if (err) return console.error(err);
                console.log("Deploy completed");
            });
        });
    }

    execute(address, input) {
        this.storage.load(address, function(value) {
            let child = exec('node ' + 'storage/' + address + '.js --state \'' + value + '\' --input \'' + input + '\'', function (err, stdout, stderr) {
                if (err) return console.error(err);
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
            });

        });
    }
}

module.exports = Engine;
