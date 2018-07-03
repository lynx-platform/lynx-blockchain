var jot = require('json-over-tcp');
var Transaction = require('./Transaction.js');
var Blockchain = require('./Blockchain.js');
class BaseNode {

    constructor(blockchain, port=3030, firstPeerNode=undefined){
        //TODO peers는 노드정보여야 한다.
        this.peers = [];
        this.blockchain = blockchain;
        if (firstPeerNode!=undefined){
            console.log(firstPeerNode);
            this.connectPeer(firstPeerNode);
        }
        this.port = port;
    }

    createServer(){
        console.log("create Server");
        let server = jot.createServer(((socket)=>{
//        server.on('connection', ((socket)=>{
            console.log('socket connected>>' + socket.remoteAddress + ':' + socket.remotePort);
            console.log('socket connected>>' + socket.localAddress + ':' + socket.localPort);
            this.peers.push();

            socket.on('data',((data)=>{
                switch (data.msgType){
                    case 'addr':
                        for(const node in data.addr_list){
                            this.connectPeer(node);
                        }
                        break;
                    case 'inv':
                        console.log("inv receiver : "+socket.remotePort);
                        replyInv.call(this, socket, data.inventory);
                        /*
                        var replyInvBind= replyInv.bind(this);
                        replyInvBind(socket, data.inventory);
                        */
                        break;
                    case 'get':
                        break;
                    case 'getAddr':
                        addr(socket);
                        break;
                    case 'getdata':
                        replyGetData(socket, data.inventory);
                        break;
                    case 'getblocks':
                        console.log("get getblocks");
                        console.log("getblocks receiver : "+socket.remotePort);
                        replyGetBlock(socket, data.inventory);
                    case 'tx':
                        pushTx(socket, data.transactions);
                    case 'block':
                        pushBlock(socket, data.blocks);
                    default:
                        break;
                }

            }).bind(this));

            socket.on('end', ()=>{
                console.log('socket disconnected');
            });

            function replyInv(socket, inventory){
                let txsInv = [];
                let blocksInv = [];
                for(const i in inventory){
                    let flag = false;
                    const inv = inventory[i];
                    const hash = inv.hash;
                    switch(inv.type){
                        case 'msg_tx':
                            for(const i in this.blockchain.memPool){
                                const tx = this.blockchain.memPool[i];
                                if(tx.calculateHash == hash){
                                    txsInv.push(inv);
                                    break;
                                }
                            }
                            break;
                        case 'msg_block':
                            console.log('get msg_block');
                            for(const i in this.blockchain.chain){
                                if(this.blockchain.chain[i].hash == hash){
                                    console.log("find matching block");
                                    flag = true;
                                    break;
                                }
                            }
                            if(flag == false){
                                blocksInv.push(inv);
                            }
                            flag = false;
                            break;
                        default:
                            break;
                    }
                }

                if(txsInv.length!=0){
                    getData(socket, txsInv);
                }

                if(blocksInv.length!=0){
                    getBlocks(socket, blocksInv);
                }

            }
            function replyGetData(socket, inventory){
                let txs = [];
                for(const i in this.blockchain.memPool){
                    const tx = this.blockchain.memPool[i];
                    const hash = tx.calculateHash();
                    const inv = new Inventory('msg_tx',hash);
                    if(inventory.includes(inv)){
                        txs.push(tx);
                    }
                }
                socket.write({'msgType':'tx', 'transactions':txs});
            }

            function replyGetBlock(socket, inventory){
                let blocks = [];
                for(const i in this.blockchain.chain){
                    const block = this.blockchain.chain[i];
                    const hash = block.calculateHash();
                    const inv = new Inventory('msg_block',hash);
                    if(inventory.includes(inv)){
                        blocks.push(block);
                    }
                }
                socket.write({'msgType':'block', 'blocks':blocks});

            }

            function pushTx(socket, transactions){
                let invs = [];
                for(const i in transactions){
                    const tx = transactions[i];
                    if(!this.blockchain.memPool.includes(tx)){
                        this.blockchain.createTransaction();
                        let inv = new Inventory('msg_tx',tx.calculateHash());
                        invs.push(inv);
                    }
                }
                this.sendInv(invs, socket);
            }

            function pushBlock(socket, blocks){
                console.log("pushBlock");
                let invs = [];
                for(const i in transactions){
                    const block = this.blockchain.chain[i];
                    if(!this.blockchain.chain.includes(block)){
                        this.blockchain.createTransaction(block);
                        let inv = new Inventory('msg_block', block.calculateHash());
                        invs.push(inv);
                    }
                }
                this.sendInv(invs, socket);

            }

            function addr(socket){
                //TODO socket port and listener port is different!
                let nodes = [];
                let count = 0;
                for (let peer in this.peers){
                    let node = new Node(peer.remoteAddress, peer.port);
                    nodes.push(node);
                    count++;
                };
                socket.write({'msgType':'addr', 'addr_list':nodes});
            }

            function getData(socket, inventory){
                socket.write({'msgType':'getdata', 'inventory':inventory});
            }

            function getBlocks(socket, inventory){
                console.log("real getBlock, inv : "+inventory[0].hash);
                console.log("with socket, "+socket.remotePort);
                socket.write({'msgType':'getblocks', 'inventory':inventory});
            }

            function notFound(socket, data){
                socket.write({'msgType':'notfound', 'inventory':data});
            }

            function getHeaders(socket){

            }
        }).bind(this));



        server.listen(this.port, function(){
            console.log('Server listening : ' + JSON.stringify(server.address()));
            server.on('close', function(){
                console.log('Server terminated');
            });
            server.on('error', function(err){
                console.log('Server error : ', JSON.stringify(err));
            });
        });
    }

    connectPeer(node){
        let socket = new jot.Socket();
        socket.connect(node.port, node.ip, (()=>{
            socket.localPort = this.port;
            this.peers.push(socket);
        }).bind(this));
    }


    sendInv(inventory, socket = undefined){
        console.log(this.peers);
        for(let i in this.peers){
            if(this.peers[i] != socket){
//                this.peers[i].write({msgType:'inv'});

                console.log(inventory);
                console.log(JSON.stringify(inventory));
                this.peers[i].write({'msgType':'inv', 'inventory':inventory});
                console.log("inv sender : "+this.peers[i].remotePort);
                console.log("before sending, data : "+JSON.stringify(inventory));
            }
        }
    }
}

class Inventory{
    constructor(type, hash){
        if(type == 'error' ||
           type == 'msg_tx' ||
           type == 'msg_block'){
               this.type = type;
           }
        this.hash = hash;
    }
}

class Node{
    constructor(ip, port){
        this.ip = ip;
        this.port = port;
    }
}

let blockchain1 = new Blockchain("first");
let bNode1 = new BaseNode(blockchain1);
bNode1.createServer();
let blockchain2 = new Blockchain("second");
const node = new Node('127.0.0.1',3030);
let bNode2 = new BaseNode(blockchain2, 3040, node);
bNode2.createServer();
for(let i=1; i<4; i++){
    setTimeout(()=>{
        console.log("start "+i);
        bNode2.blockchain.createTransaction(new Transaction(i,i,i));
        bNode2.blockchain.createTransaction(new Transaction(i,2*i,3*i));
        bNode2.blockchain.minePendingTransactions();
        bNode2.sendInv([new Inventory('msg_block', bNode2.blockchain.chain[i].hash)]);
    },1000*i);
}
setTimeout(()=>{
    console.log(bNode1.blockchain.chain[3]);
},4000)