// This is a workload offloading example using lynx blockchain.

// Import Edge programming interface of lynx.
var Edge = require('../../edge/Edge.js');

// Contracts are defined as JavaScript classes.
class OffloadContract {
    prerequisite(workloadHashPtr, inputHash, bountyAmount, requestNo, signature) {
        // Check the sender address.
        Edge.validateSignature(signature);
        
        // Check if there is enough balance for the bounty in the sender's
        // deposit.
        Edge.getDeposit(
    }
}


