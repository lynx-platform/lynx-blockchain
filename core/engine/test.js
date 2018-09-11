var Engine = require('./engine.js');
var engine = new Engine('leveldb');

switch (process.argv[2]) {
    case 'deploy':
        if (process.argv.length < 3) return console.error("lack of args");
        var constructor = function () {
            console.log("constructor");
            return JSON.stringify({
                a: 30,
                b: "asdf"
            });
        };
        engine.deploy(process.argv[3], constructor);
        break;
    case 'execute':
        //if (process.argv.length < 4) return console.error("lack of args");
        //engine.execute(process.argv[3], JSON.parse(process.argv[4]));
				let address = process.argv[3];
				//let msg = process.argv[4];
				let msg = JSON.stringify({ address: "0x1234", balance: 100 });
				//let func = process.argv[5];
				let func = "testFunc";
        engine.execute(address, msg, func);
        break;
    default:
        console.log("Option is needed");
}
