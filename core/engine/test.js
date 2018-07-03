var Engine = require('./Engine.js');
var engine = new Engine('leveldb');

switch (process.argv[2]) {
    case 'deploy':
        var constructor = function () {
            console.log("constructor");
            return JSON.stringify({
                a: 30,
                b: "asdf"
            });
        };
        engine.deploy('./programs/loop.js', constructor);
        break;
    case 'execute':
        if (process.argv.length < 4) {
            console.error("lack of args");
            return;
        }
        let state = process.argv[3];
        let input = process.argv[4];
        if (!input) input = '{}';
        engine.execute(state, input);
        break;
    default:
        console.log("Option is needed");
}
