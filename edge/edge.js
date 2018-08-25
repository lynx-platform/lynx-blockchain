const promise = require('promise');
const fork = require('child_process').fork;
const path = require('path');

class Edge {
    constructor() {
    }

    // Program execution for pure function
    call(address, state, msg) {
        return new Promise((resolve, reject) => {
            const pgm = fork(path.resolve(address), [], { env: { state: state, msg: msg } });
            pgm.on('message', (msg) => {
                switch(msg.cmd) {
                    case 'balance':
                        console.log("balance");
                        break;
                    case 'close':
                        console.log("close");
                        break;
                    default:
                        console.log("fallback");
                }
            });
        });
    }

    // Program execution for state transition
    send(address, state, msg) {

    }
}

var edge = new Edge();
edge.call('example.js', { a: 10 }, { sender: '0x1234' });
