const optionDefinitions = [
    { name: 'state', type: String, multiple: true, defaultOption: true },
    { name: 'input', type: String, multiple: true},
]

const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);

console.log(options);

module.exports = options;
