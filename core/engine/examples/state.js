const edge = require('../../../edge/Edge.js');

var a = edge.state['a'];

for (let i = 0; i < 100; i++) {
    a++;
}

console.log(edge.setState({'a': a}));
