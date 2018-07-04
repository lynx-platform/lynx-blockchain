var Edge = require('../../edge/Edge.js');

// Deposit class defines depositable contracts having their own balance.
// deposit and withdraw is the main functionality this model supports.
// Provides security check.
class Deposit {
    constructor() {
        this.depositMap = {
            undefined: 0
        };
    }

}

module.exports = Deposit;
