//const edge = require('./newEdge.js')

var env = process.env;

for (key in env) {
    this[key] = env[key];
}

const run = async () => {
    console.log(env);
    console.log(sender);
	//let balance = await edge.getBalance('A095FD3');
	//console.log('balance : ' + balance);

    process.send({cmd: 'balance', balance: 19});

	//balance = await edge.getBalance('A095FD3');
	//console.log('balance : ' + balance);

	process.send({cmd : 'output'});
    process.exit();
}

run();
