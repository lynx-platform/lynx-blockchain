var levelup = require('levelup')
var leveldown = require('leveldown')

class Storage {
    constructor (path) {
        this.db = levelup(leveldown(path));
    }

    load(address, callback) {
        // key:     hash value
        this.db.get(address, function (err, value) {
            if (err) return console.error('Error: ', err);
            callback(JSON.parse(value));
        });
    }

    store(address, value, callback) {
        // key:     hash value
        // value:   program state
        this.db.put(address, JSON.stringify(value), function (err) {
            if (err) return console.error('Error: ', err);
            if (callback) callback();
        });
    }
}

module.exports = Storage;
