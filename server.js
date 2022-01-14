// "StAuth10222: I James Gelfand, 000275852 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else."


// Example of a quiz game built with NodeJS

// Required packages
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// The auctioneer page
app.get('/auctioneer', function(req,res){
  res.sendFile(__dirname + '/auctioneer.html');
});

// The bidder page, may be multiple bidders
app.get('/bidder', function(req,res){
  res.sendFile(__dirname + '/bidder.html');
});

// Websocket connection
io.on('connection', function(socket){

  // when the auctioneer submits an item.
  socket.on("submit_item", function(item)
  {
    // Make sure we've received the item
    console.log("Item submitted: " + JSON.stringify(item));

    io.emit("deliver_item", item);
  });
  
  // when a student submits an answer...
  socket.on("submit_bid", function(bid){

    // Make sure we've received the item
    console.log("Bid submitted: " + JSON.stringify(bid));
   
    io.emit("deliver_bid", bid);
  });
});

// Start the server
http.listen(3000, function(){
  console.log('listening on *:3000');
});

