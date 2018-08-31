var Block = require('./Block.js');
var Transaction = require('./Transaction.js');
var Engine = require('./engine/Engine.js');
var BlockDB = require('./BlockDB.js')

// Blockchain class defines the data structure of the full (validating) node
// in the blockchain network, as well as the APIs to make use of the system.
class Blockchain {
	constructor(miningRewardAddress) {
		// Blockchain
		this.chain = [this.createGenesisBlock()];
		// this.blockchainDB = new BlockDB('./blockchain');
		this.blockDB = new BlockDB();

		this.confirmBalance = {};
		this.currentBalance = {};

		// Reward for miner
		this.coinbase = new Array(64).join('0');
		console.log("coinbase : ", this.coinbase);
		this.miningReward = 100;
		this.miningRewardAddress = miningRewardAddress;

		// Memory Pool for storing pending transactions
		this.memPool = [];
		this.createTransaction( new Transaction('type', 'nonce', this.coinbase, this.miningRewardAddress, false, this.miningReward, null, null));
	}

	createGenesisBlock() {
		return new Block(0, "28/06/2018", [], "Genesis block", 3);
	}

	pushBlock(block) {
		if(block.index = this.chain.length){
			if(block.previousHash == this.chain[this.chain.length - 1].hash) {
				this.chain.append(block);
				return 0;
			}
		}
		else if(block.index < this.chain.length){
			this.chain[block.index] = block;
			return 0;
		}
		else {
			for(var i=0 ; i<block.index-this.chain.length ; i++){
				this.chain.append(0);
			}
			this.chain.append(block);
		}

		this.blockDB.putBlock(block);
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	createTransaction(transaction) {
		if(this.isTransactionValid(transaction)) {
			this.changeCurrentBalance(transaction);
			this.memPool.push(transaction);
		}
	}

	// Debug
	getMemPoolState() {
		for (const tx in this.memPool) {
			console.log(this.memPool[tx]);
		}
	}

	minePendingTransactions() {
		let latestBlock = this.getLatestBlock(); // latestBlock -> ?????
		// Create new block with all pending transactions and mine it..
		let block = new Block(this.chain.length, Date.now(), this.memPool, latestBlock.hash, latestBlock.nonce, latestBlock.difficulty);
		block.mineBlock();
		console.log(block);

		this.blockDB.putBlock(block);

		// Add the newly mined block to the chain
		this.chain.push(block);

		// Reset the pending transactions and send the mining reward
		const coinbaseTransaction = new Transaction('type', 'nonce', this.coinbase, this.miningRewardAddress, false, this.miningReward, null, null);
		this.memPool = [coinbaseTransaction];
		this.changeCurrentBalance(coinbaseTransaction);
	}

	getBalanceOfAddress(address){
		this.blockchainDB.getBalance(address, (balance)=>{
			consol.log(balance);
			return balance;
		});
		// UTXO model
		/*
		let balance = 0; // you start at zero!

		console.log(this.chain);

		// Loop over each block and each transaction inside the block
		for(const block of this.chain){
			for(const trans of block.transactions){

				// If the given address is the sender -> reduce the balance
				if(trans.fromAddress === address){
					balance -= trans.amount;
				}

				// If the given address is the receiver -> increase the balance
				if(trans.toAddress === address){
					balance += trans.amount;
				}
			}
		}
		*/

	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}

	isTransactionValid(transaction) {
		if (this.currentBalance[transaction.fromAddress]-transaction.value > 0) return true
		else return false
	}

	changeCurrentBalance(transaction) {
		const fromAddress = transaction.fromAddress
		const toAddress = transaction.toAddress
		const value = transaction.value
		if(fromAddress != this.coinbase){
			this.currentBalance[fromAddress] -= value;
		}
		if(!(toAddress in this.currentBalance)){
			this.currentBalance[toAddress] = 0;
			console.log(this.currentBalance[toAddress]);
		}
		this.currentBalance[toAddress] += value;
		console.log("current Balance : ", this.currentBalance)
	}
}

module.exports = Blockchain;