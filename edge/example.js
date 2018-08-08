const edge = require('./newEdge.js')

const run = async () => {
	let balance = await edge.getBalance('A095FD3');
	console.log('balance : ' + balance);

	balance = await edge.getBalance('A095FD3');
	console.log('balance : ' + balance);

	process.send({cmd : 'output'});
}

run();
