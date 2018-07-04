const SHA256 = require('crypto-js/sha256');
const commandLineArgs = require('command-line-args');
const edge_debug = require('debug')('edge');

// TODO: refine options
const argsDefinitions = [
	{ name: 'blockchain', type: String, multiple: false, defaultOption: true },
	{ name: 'state', type: String, multiple: false},
	{ name: 'input', type: String, multiple: false},
];

// Edge class defines an API layer to implement edge computing technique
// embeded in our blockchain service layer.
// TODO Add challenging logic.
class Edge {
	constructor() {
		let args = commandLineArgs(argsDefinitions);
		this.state = JSON.parse(args.state);
		this.input = JSON.parse(args.input);
	}

	getState(arg) {
		edge_debug('state: ' + this.state);
		return this.state[arg];
	}

	getInput(arg) {
		edge_debug('input: ' + this.input);
		return this.input[arg];
	}

	setState(state) {
		for (let key in state) {
			if (key in this.state) this.state[key] = state[key];
		}
		return 'Σ' + JSON.stringify(this.state);
	}

	getBalance(address) {
		
	}

	transmit(address, amount) {

	}

	getTxSigniture() {
		
	}

	validateSignature(signature) {
	
	}

	hash(input) {
		return SHA256(input);
	}
}

module.exports = new Edge();
