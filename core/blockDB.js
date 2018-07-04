var levelup = require('levelup');
var leveldown = require('leveldown');
var Block = require('./Block.js');
const blockDB_debug = require('debug')('blockDB');

const chunk = 100;

// Storage class defines basic functionalities to implement storage interface.
class BlockDB {
	constructor (path) {
		this.db = levelup(leveldown(path));
	}

	// TODO: JSON.parse?
	getBlockByHeight(height) {
		let blockNum = height / chunk;
		this.db.get(blockNum, (err, blockChunk) => {
			return blockChunk[blockNum % chunk];
		});
	}

	getBlockByHash(hash) {
		this.db.get('latest', (err, blockChunk) => {
			while (blockChunk > 0) {
				
			}
		});
	}
	
	getBalance(address) {
		this.db.get(address, (err, balance) => {
			return balance;
		}
	}


	load(address, callback) {
		// key:     hash value
		this.db.get(address, (err, value) => {
			if (err) return console.error('Error: ', err);
			callback(JSON.parse(value));
		});
	}

	store(address, value, callback) {
		// key:     hash value
		// value:   program state
		this.db.put(address, JSON.stringify(value), (err) => {
			if (err) return console.error('Error: ', err);
			if (callback) callback();
		});
	}
}

module.exports = Storage;
