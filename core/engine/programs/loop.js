const global = require('./wrapper.js');

var a = JSON.parse(global.src).a;

for (let i = 0; i < 100; i++) {
    a++;
}

console.log(a);
