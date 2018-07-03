const commandLineArgs = require('command-line-args');
const edge_debug = require('debug')('edge');

// TODO: refine options
const argsDefinitions = [
    { name: 'state', type: String, multiple: false, defaultOption: true },
    { name: 'input', type: String, multiple: false},
];

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
        return JSON.stringify(this.state);
    }
}

module.exports = new Edge();
