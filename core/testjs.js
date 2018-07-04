class Book{
  read(){
    console.log("read");
  }

  print(){
    this.read();
  }
}

var book = new Book();
book.read();
book.print();
var net = require('net');
var jot = require('json-over-tcp');
var server = jot.createServer(function(client) {
  console.log('Client connection: ');
  console.log("b");
  var a = a();
  console.log('   local = %s:%s', client.localAddress, client.localPort);
  console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);
  client.setTimeout(500);
  client.setEncoding('utf8');
  client.on('data', function(data) {
    console.log('Received data from client on port %d: [%s]',
                client.remotePort, data);
    console.log('  Bytes received: ' + client.bytesRead);
    writeData(client, 'Sending: ' );
    console.log('  Bytes sent: ' + client.bytesWritten);
  });
  client.on('end', function() {
    console.log('Client disconnected');
    server.getConnections(function(err, count){
      console.log('Remaining Connections: ' + count);
    });
  });
  client.on('error', function(err) {
    console.log('Socket Error: ', JSON.stringify(err));
  });
  client.on('timeout', function() {
    console.log('Socket Timed out');
  });
  function a(){
    console.log("a");
  }
});
server.listen(8107, function() {
  console.log('Server listening: ' + JSON.stringify(server.address()));
  server.on('close', function(){
    console.log('Server Terminated');
  });
  server.on('error', function(err){
    console.log('Server Error: ', JSON.stringify(err));
  });
});
function getConnection(connName){
  var client = jot.connect({port: 8107, host:'localhost'}, function() {
    console.log(connName + ' Connected: ');
    console.log('   local = %s:%s', this.localAddress, this.localPort);
    console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
    this.setTimeout(500);
    this.setEncoding('utf8');
    this.on('data', function(data) {
      console.log(typeof data);
      console.log(connName + " From Server: " + data);
      this.end();
    });
    this.on('end', function() {
      console.log(connName + ' Client disconnected');
    });
    this.on('error', function(err) {
      console.log('Socket Error: ', JSON.stringify(err));
    });
    this.on('timeout', function() {
      console.log('Socket Timed Out');
    });
    this.on('close', function() {
      console.log('Socket Closed');
    });
  });
  return client;
}
function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }
}
var Dwarves = getConnection("Dwarves");

writeData(Dwarves, {"name":"js"});