var Engine = require('./Engine.js');

var option = process.argv[2];

/*
(new Promise(function(resolve, reject) {
    var e = new Engine('leveldb');
    resolve(e);
})).then(function (engine) {
    let constructor = function () {
        console.log("constructor");
        return JSON.stringify({
            a: 30,
            b: "asdf"
        });
    };
    engine.deploy('./programs/loop.js', constructor);
});
*/

var engine = new Engine('leveldb');

switch (option) {
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
    case 'exec':
        engine.execute(process.argv[3], process.argv[4]);
        break;
    default:
        console.log("Option is needed");
}
//e.execution({}, 0);


//e.execute('e6d25dd02d0135f574542ac955908bff72e6fbebb25d2250e32e48f2aea6c7e4', 'a');


//e.getProgram();
