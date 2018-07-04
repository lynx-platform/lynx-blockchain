// This is a workload offloading example using lynx blockchain.

// Import Edge programming interface of lynx.
var Edge = require('../../edge/Edge.js');

// Contracts are defined as JavaScript classes.
class OffloadContract {
    // Deposit interface model defines depositable contracts having their own
    // balance. deposit and withdraw is the main functionality this model supports.
    // Provides security check.

    // Deposit some amount from the node balance.
    deposit(address, amount) {
        // Must be preceded with balance check.
        Edge.getBalance(address, (balance) => {
            if (balance < amount) {
                console.log('Balance does not accomodate deposit amount');
                return;
            }

            // TODO Validate transaction with signature
            // Edge.validateSignature(signature)

            // Add new deposit amount
            if (!depositMap[address])
                depositMap[address] += amount;
            else
                depositMap[address] = amount;
            depositMap[undefined] -= amount;
        });
    }

    // Withdraw from the deposit in the contract.
    withdraw(address, amount) {
        if (!depositMap[address]) {
            console.log('Retrieval from empty address: ' + address);
        }
        else if (depositMap[address] < amount) {
            console.log('Retrieval from deposit insufficient deposit: ' + address);
        }
        else {
            depositMap[address] -= amount;
            
            // Send transaction from contract to the address.

        }
    }

    // Get values in the deposit assigned to the specified address. If none is
    // specified, return undepositted value.
    getDeposit(address) {
        var val = depositMap[address];
        if (!val) return 0;
        else return val;
    }

    // Pouch interface model provides partitioning the current balance the node
    // owns. Each partition is stored as a map of JavaScript, so it can be called
    // by name. This abastraction supports manipulation of a balance with lumped
    // model.
    
    // Create partition
    partition(name, ) {
    }

    // Prerequisite
    prerequisite(workloadHashPtr, inputHash, bountyAmount, requestNo, signature) {
        // Check the sender address.
        Edge.validateSignature(signature);
        
        // Check if there is enough balance for the bounty in the sender's
        // deposit.
        Edge.getDeposit(
    }
}


