const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'src', type: String, multiple: true, defaultOption: true },
    { name: 'timeout', alias: 't', type: Number }
]

const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);

console.log(options.src[0]);

globals = JSON.parse(options.src[0]);

for (let i = 0; i < 100; i++) {
    globals.a++;
}

console.log(globals.a);
