var Block = require('./Block.js');
var Blockchain = require('./Blockchain.js');
var Transaction = require('./Transaction.js');

let lynxChain = new Blockchain('lynx-address');

console.log('Creating some transactions...');

setTimeout(()=>{
lynxChain.createTransaction(new Transaction(0, 0, 'address1', 'address2', false, 100, 0, 0));
},1000);
setTimeout(()=>{
lynxChain.createTransaction(new Transaction(0, 0, 'address2', 'address1', false, 50, 0, 0));
},2000);
setTimeout(()=>{
lynxChain.minePendingTransactions('lynx-address');
},3000);
setTimeout(()=>{
lynxChain.getBalanceOfAddress('lynx-address',(balance)=> {
    console.log('Balance of lynx address is', balance);
});
lynxChain.getBalanceOfAddress('address1',(balance)=> {
    console.log('Balance of address1 is', balance);
});
lynxChain.getBalanceOfAddress('address2',(balance)=> {
    console.log('Balance of address2 is', balance);
});
},4000);

/*
console.log("memPool state:");
//lynxChain.getMemPoolState();

console.log('Starting the miner...');


console.log('Balance of lynx address is', lynxChain.getBalanceOfAddress('lynx-address'));
console.log('Balance of lynx address is', lynxChain.getBalanceOfAddress('address1'));
console.log('Balance of lynx address is', lynxChain.getBalanceOfAddress('address2'));}
);
lynxChain.minePendingTransactions('lynx-address');
console.log('Balance of lynx address is', lynxChain.getBalanceOfAddress('lynx-address'));
*/
