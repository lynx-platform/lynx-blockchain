var levelup = require('levelup')
var leveldown = require('leveldown')

class Storage {
    constructor (path) {
        this.db = levelup(leveldown(path));
    }

    store(address, value, callback) {
        // key:     hash value
        // value:   program state
        this.db.put(address, value, function (err) {
            if (err) return console.error('Error: ', err);
            if (callback) callback();
        });
    }

    load(address, callback) {
        // key:     hash value
        this.db.get(address, function (err, value) {
            if (err) return console.error('Error: ', err);
            callback(value);
        });
    }
}

module.exports = Storage;
