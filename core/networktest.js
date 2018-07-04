var jot = require('json-over-tcp');
var Transaction = require('./Transaction.js');
var Blockchain = require('./Blockchain.js');
var Promise = require('promise');
var Network = require('./Network.js')




let blockchain1 = new Blockchain("first");
let bNode1 = new Network.Basenode(blockchain1);
bNode1.createServer();
let blockchain2 = new Blockchain("second");
const node = new Network.Node('127.0.0.1',3030);
let bNode2 = new Network.Basenode(blockchain2, 3040, node);
bNode2.createServer();
for(let i=1; i<4; i++){
    setTimeout(()=>{
        console.log("start "+i);
        bNode2.blockchain.createTransaction(new Transaction(i,i,i));
        bNode2.blockchain.createTransaction(new Transaction(i,2*i,3*i));
        bNode2.blockchain.minePendingTransactions();
        console.log(i);
        console.log(bNode2.blockchain.chain[i].hash);
        bNode2.sendInv([new Network.Inventory('msg_block', bNode2.blockchain.chain[i].hash)],()=>{console.log(bNode2.blockchain.chain[i].hash)});
    },1000*i);
}
setTimeout(()=>{
    console.log(bNode1.blockchain.chain[1]);
    console.log(bNode2.blockchain.chain[1]);
    console.log(bNode1.blockchain.chain[2]);
    console.log(bNode2.blockchain.chain[2]);
    console.log(bNode1.blockchain.chain[3]);
    console.log(bNode2.blockchain.chain[3]);
},4000)
