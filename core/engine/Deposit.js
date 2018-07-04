var Blockchain = require('../Blockchain.js');
var Transaction = require('../Transaction.js');

// Deposit class defines depositable contracts having their own balance.
// deposit and withdraw is the main functionality this model supports.
// Provides security check.
class Deposit {
    constructor(blockchain, total) {
        this.blockchain = blockchain;
        this.depositMap = {
            undefined: total
        };
    }

    // Deposit some amount from the node balance.
    deposit(address, amount, signature) {
        // Must be preceded with balance check.
        blockchain.getBalanceOfAddress(address) < amount;
        // TODO when does it check??

        if (!depositMap[address])
            depositMap[address] += amount;
        else
            depositMap[address] = amount;
    }

    // Withdraw from the deposit in the contract.
    withdraw(address, amount, signature) {
        if (!depositMap[address]) {
            console.log('Retrieval from empty address: ' + address);
        }
        else if (depositMap[address] < amount) {
            console.log('Retrieval from deposit insufficient deposit: ' + address);
        }
        else {
            depositMap[address] -= amount;
            
            // Send transaction from contract to the address.
            blockchain.createTransaction(new Transaction(..........));
        }
    }

    // Get values in the deposit assigned to the specified address. If none is
    // specified, return undepositted value.
    getDeposit(address) {
        var val = depositMap[address];
        if (!val) return 0;
        else return val;
    }
}

module.exports = Deposit;
