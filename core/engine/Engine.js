var fs = require('fs');
var SHA256 = require('crypto-js/sha256');
var exec = require('child_process').exec;
var Storage = require('./Storage.js');

var debug_exec = require('debug')('engine:exec');
var storage = undefined;

// Engine class defines simple execution logic of the blockchain node (client).
// Lynx blockchain uses Google V8 JavaScript Engine as backbone validating VM.
// Deploying smart contracts automatically calls deploy() funciton and try to
// run constructor for initiation. Execution of a function defined in a smart
// contract is done by sending transaction TO a contract address with approp-
// riate arguments.
class Engine {
	constructor(name, callback) {
		storage = new Storage(name);
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

		storage.store(address, state, function() {
			fs.writeFile('storage/' + address + '.js', code, function(err) {
				if (err) return console.error(err);
				console.log("Deploy completed");
			});
		});
	}

	// execute - Called by transaction which specifies 
	execute(address, input) {
		storage.load(address, function(value) {
			debug_exec(value);
			let command = 'node ' + 'storage/' + address + '.js --state \'' + value + '\' --input \'' + input + '\'';
			debug_exec(command);
			let child = exec(command, function (err, stdout, stderr) {
				if (err) return console.error(err);
				debug_exec('stdout: ' + stdout);
				//TODO: change stdout to return value of the program
				if (stdout.charAt(0) == 'Σ') {
					let state = stdout.substring(1, stdout.length);
					storage.store(address, state);
				}
			});
		});
	}
}

module.exports = Engine;
