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
		this.blockchainDB = new BlockDB('./blockchain');
		//this.programStateDB = new BlockDB('./programState');

		// Reward for miner
		this.coinbase = new Array(64).join('0');
		this.miningReward = 100;
		this.miningRewardAddress = miningRewardAddress;

		// Memory Pool for storing pending transactions
		this.memPool = [];
		this.createTransaction( new Transaction(0, 0, this.coinbase, this.miningRewardAddress, false, this.miningReward, null, null));
	}

	createGenesisBlock() {
		return new Block(0, "28/06/2018", [], "Genesis block", 3);
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	createTransaction(transaction) {
		this.memPool.push(transaction);
		/*
		this.blockchainDB.changeBalance(transaction, ()=>{
			this.memPool.push(transaction);
		});
		*/
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


		// Add the newly mined block to the chain
		this.chain.push(block);

		// Reset the pending transactions and send the mining reward
		this.memPool = [
			new Transaction(0, this.coinbase, this.miningRewardAddress, false, this.miningReward, null, null)
		];
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
}

module.exports = Blockchain;
