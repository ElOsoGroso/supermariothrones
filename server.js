/**
* @Author: Justin Hershberger
* @Date:   02-04-2017
* @Filename: server.js
* @Last modified by:   Justin Hershberger
* @Last modified time: 02-04-2017
*/
'use strict'

//this file is so the game runs using node.js and express
let express = require('express');
let app = express();

// this allows us to use all the statis files we need to run the game
app.use(express.static(__dirname))

app.get('/', function(req, res){
  res.sendFile(__dirname + "/" + "index.html")
})

let server = app.listen(8080, function(){
  let port = server.address().port;
  console.log('Game listening on localhost:', port);
});
