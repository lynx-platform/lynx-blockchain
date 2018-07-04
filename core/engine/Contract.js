var Blockchain = require('../Blockchain.js');
var Transaction = require('../Transaction.js');

// DAO class defines depositable contracts having their own balance.
// deposit and withdraw is the main functionality this model supports.
// Provides security check.
class DAO {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.depositMap = new Object();
    }

    // Deposit some amount from the node balance.
    deposit(address, amount) {
        // Must be preceded with balance check.
        blockchain.getBalanceOfAddress(address) < amount;
        // TODO when does it check??

        if (depositMap[address] != null) {
            depositMap[address] += amount;
        } else {
            depositMap[address] = amount;
        }
    }

    // Withdraw from the deposit in the contract.
    withdraw(address, amount) {
        if (depositMap[address] != null) {
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
}

module.exports = DAO;
