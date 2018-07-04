var Blockchain = require('../Blockchain.js');
var Transaction = require('../Transaction.js');

// Contract class defines the edge computing core logics.
// This part should be extended to the basis of embedded smart contract.
class Contract {
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

    // Retrival from the deposit in the contract.
    retrieval(address, amount) {
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

    // Validate the input data hash
    validateInput(
}

module.exports = Contract;
