var levelup = require('levelup');
var leveldown = require('leveldown');
var Block = require('./Block.js');
const blockDB_debug = require('debug')('blockDB');

const chunk = 100;

var path = "./DB"
var db = levelup(leveldown(path))

// Storage class defines basic functionalities to implement storage interface.
class BlockDB {
	constructor () {
		console.log("is blockdb");
		console.log(path);
		this.blockDB = db;
		this.blockDB.put("address1","10");
	}

	putBlock(block) {
		console.log("put block")
		console.log(block)
		console.log(JSON.stringify(block))
		this.blockDB.put(block.hash, JSON.stringify(block), (err) => {
			if (err) return console.log('Ooops!', err) // some kind of I/O error
		})

		this.blockDB.get("blockHashes", (err, value) => {

			if (err) return console.log('Ooops!', err) // some kind of I/O error

			value = JSON.parse(value);

			if (value.length == block.index) {
				value.append(block.hash)
			}
			else if (value.length < block.index) {
				const diff = block.index - value.length;
				for (var i = 0; i < diff; i++) {
					value.append(0);
				}
				value.append(block.hash)
			}
			else {
				value[block.index] = block.hash
			}

			value = JSON.stringify(value)
			this.blockDB.put("blockHashes", value, (err) => {
				if (err) return console.log('Ooops!', err)
			})
		})
	}

	putBalance(height, balance) {
		this.blockDB.put(height, JSON.stringify(balance), (err) => {
			if (err) return console.log('Ooops!', err)
		})
	}

	getBalance(height) {
		this.blockDB.get(height, (err, value) => {
			if (err) return console.log('Ooops!', err)

			return JSON.parse(value)
		})
	}



	// TODO: JSON.parse?
	getBlockByHeight(height) {
		this.blockDB.get("blockHashes", (err, value) => {

			if (err) return console.log('Ooops!', err) // some kind of I/O error

			value = JSON.parse(value)

			const hash = value[height];
			this.blockDB.get(hash, (err, value) => {
				if (err) return console.log('Ooops!', err) // some kind of I/O error
				return JSON.parse(value);
			});

		});
		// let blockNum = height / chunk;
		// this.blockDB.get(blockNum, (err, blockChunk) => {
		// 	return blockChunk[blockNum % chunk];
		// });
	}

	getBlockByHash(hash) {
		this.blockDB.get(hash, (err, value) => {
			if (err) return console.log('Ooops!', err) // some kind of I/O error
			return JSON.parse(value);
		});
	}

	// getBalance(address) {
	// 	this.blockDB.get(address, (err, balance) => {
	// 		if(err){
	// 			console.log("getBalance error");
	// 		} else {
	// 			console.log(balance*1);
	// 		}
	// 		return balance;
	// 	});
	// }

	// changeBalance(transaction) {
	// 	this.blockDB.get(transaction.toAddress, (err, balance) => {
	// 		let value = transaction.value*1;
	// 		if (!err) {
	// 			balance*=1;
	// 			value += balance*1;
	// 		} else {
	// 			console.log(err);
	// 		}
	// 		this.blockDB.put(transaction.toAddress, value, (err) => {
	// 			if (err) return console.error('Error: ', err);
	// 		});
	// 	});

	// 	this.blockDB.get(transaction.fromAddress, (err, balance) => {
	// 		let value = transaction.value*1;;
	// 		//console.log(transaction.value);
	// 		if (!err) {
	// 			balance*=1;
	// 			value = balance*1 - value;
	// 		} else {
	// 			console.log(err);
	// 		}
	// 		console.log(balance);
	// 		console.log(value);
	// 		this.blockDB.put(transaction.fromAddress, value, (err) => {
	// 			if (err) return console.error('Error: ', err);
	// 		});
	// 	});
	// 	/*
	// 	this.getBalance(transaction.fromAddress, ((balance) => {
	// 		console.log("in");
	// 		balance -= transaction.value;
	// 		console.log(transaction.value);
	// 		this.blockDB.put(fromAddress, JSON.stringify(value), (err) => {
	// 			if (err) return console.error('Error: ', err);
	// 			if (callback) callback();
	// 		})
	// 	}).bind(this));
	// 	*/

	// 	/*
	// 	this.getBalance(transaction.toAddress, ((balance) => {
	// 		balance += transaction.value;
	// 		this.blockDB.put(toAddress, JSON.stringify(value), (err) => {
	// 			if (err) return console.error('Error: ', err);
	// 			if (callback) callback();
	// 		});
	// 	}).bind(this));
	// 	*/
	// }

	// resetBalance(balanceJson, newAddress){
	// 	for(let i in newAddress){
	// 		this.blockDB.del(newAddress[i], (err) => {
	// 			if (err) return console.error('Error: ', err);
	// 			if (callback) callback();
	// 		});
	// 	}
	// 	for(let address in balanceJson){
	// 		this.blockDB.put(address, JSON.stringify(balanceJson.address), (err) => {
	// 			if (err) return console.error('Error: ', err);
	// 			if (callback) callback();
	// 		});
	// 	}

	// }


}

module.exports = BlockDB;
