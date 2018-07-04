var Transaction = require('../Transaction.js');
var BlockDB = require('../BlockDB.js');

var blockDB = new BlockDB('../../blockDB');

// Deposit class defines depositable contracts having their own balance.
// deposit and withdraw is the main functionality this model supports.
// Provides security check.
class Deposit {
    constructor() {
        this.depositMap = {
            undefined: 0
        };
    }

    // Deposit some amount from the node balance.
    deposit(address, amount, signature) {
        // Must be preceded with balance check.
        blockDB.getBalance(address, (balance) => {
            if (balance < amount) {
                console.log('Balance does not accomodate deposit amount');
                return;
            }

            // Update intrinsic balance.
            var sum = 0;
            Object.keys(this.depositMap).forEach(function (key) {
                if (!key)
                    sum += this.depositMap[key];
            });

            blockDB.getBalance(/* TODO */ getAddress(), (balance) => {
                blockDB
            depositMap[undefined] = blockDB.getBalance(

            // Add new deposit amount
            if (!depositMap[address])
                depositMap[address] += amount;
            else
                depositMap[address] = amount;
            depositMap[undefined] -= amount;
        });
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
