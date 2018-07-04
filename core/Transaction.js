// Transaction class defines the data structure for transaction in the
// blockchain. In the Lynx blockchain, there are two types of transaction:
// (1) Contract creation
// (2) Message call (Remote contract call)
class Transaction {
    constructor(type, nonce, fromAddress, toAddress, isToContract, value, signature, data) {
        this.type = type;
        this.nonce = nonce;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.isToContract = isToContract;
        this.value = value;
        this.signature = signature; // TODO
        this.data = data;
    }
}

module.exports = Transaction;
