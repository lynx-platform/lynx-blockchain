var levelup = require('levelup');
var leveldown = require('leveldown');
var Block = require('./Block.js');
const blockDB_debug = require('debug')('blockDB');

const chunk = 100;

// Storage class defines basic functionalities to implement storage interface.
class BlockDB {
	constructor (path) {
		console.log("is blockdb");
		console.log(path);
		this.blockDB = levelup(leveldown(path));
		this.blockDB.put("address1","10");
	}

	// TODO: JSON.parse?
	getBlockByHeight(height) {
		let blockNum = height / chunk;
		this.blockDB.get(blockNum, (err, blockChunk) => {
			return blockChunk[blockNum % chunk];
		});
	}

	getBlockByHash(hash) {
		this.blockDB.get('latest', (err, blockChunk) => {
			while (blockChunk >= 0) {
				for (let block in blockChunk) {
					if (block.getHash() == hash) return block;
				}
			}
			blockDB_debug("Cannot find block with " + hash);
			return undefined;
		});
	}

	getBalance(address) {
		this.blockDB.get(address, (err, balance) => {
			if(err){
				console.log("getBalance error");
			} else {
				console.log(balance*1);
			}
			return balance;
		});
	}

	changeBalance(transaction) {
		this.blockDB.get(transaction.toAddress, (err, balance) => {
			let value = transaction.value*1;
			if (!err) {
				balance*=1;
				value += balance*1;
			} else {
				console.log(err);
			}
			this.blockDB.put(transaction.toAddress, value, (err) => {
				if (err) return console.error('Error: ', err);
			});
		});

		this.blockDB.get(transaction.fromAddress, (err, balance) => {
			let value = transaction.value*1;;
			//console.log(transaction.value);
			if (!err) {
				balance*=1;
				value = balance*1 - value;
			} else {
				console.log(err);
			}
			console.log(balance);
			console.log(value);
			this.blockDB.put(transaction.fromAddress, value, (err) => {
				if (err) return console.error('Error: ', err);
			});
		});
		/*
		this.getBalance(transaction.fromAddress, ((balance) => {
			console.log("in");
			balance -= transaction.value;
			console.log(transaction.value);
			this.blockDB.put(fromAddress, JSON.stringify(value), (err) => {
				if (err) return console.error('Error: ', err);
				if (callback) callback();
			})
		}).bind(this));
		*/

		/*
		this.getBalance(transaction.toAddress, ((balance) => {
			balance += transaction.value;
			this.blockDB.put(toAddress, JSON.stringify(value), (err) => {
				if (err) return console.error('Error: ', err);
				if (callback) callback();
			});
		}).bind(this));
		*/
	}

	resetBalance(balanceJson, newAddress){
		for(let i in newAddress){
			this.blockDB.del(newAddress[i], (err) => {
				if (err) return console.error('Error: ', err);
				if (callback) callback();
			});
		}
		for(let address in balanceJson){
			this.blockDB.put(address, JSON.stringify(balanceJson.address), (err) => {
				if (err) return console.error('Error: ', err);
				if (callback) callback();
			});
		}

	}


}

module.exports = BlockDB;
