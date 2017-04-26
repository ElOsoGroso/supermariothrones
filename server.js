
'use strict'

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(__dirname))

app.get('/', function(req, res){
  res.sendFile(__dirname + "/" + "index.html")
})

app.get('/highscores', function(req,res){
  let pg = require('pg');
  //or native libpq bindings
  //var pg = require('pg').native

  var conString = "postgres://eixtvjdc:uBl6PUOi6jrTPw2fGkCFYE_7VdGSH749@stampy.db.elephantsql.com:5432/eixtvjdc";

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM highscores', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
      console.log(result.rows);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
    client.query('SELECT count(*) FROM highscores', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }

      console.log(result.rows);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
})
app.get('/getspritepositions', function(req,res){
  let pg = require('pg');
  //or native libpq bindings
  //var pg = require('pg').native

  var conString = "postgres://eixtvjdc:uBl6PUOi6jrTPw2fGkCFYE_7VdGSH749@stampy.db.elephantsql.com:5432/eixtvjdc";

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM locations', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
      console.log(result.rows);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
})
app.get('/getScore', function(req,res){
  let pg = require('pg');
  //or native libpq bindings
  //var pg = require('pg').native

  var conString = "postgres://eixtvjdc:uBl6PUOi6jrTPw2fGkCFYE_7VdGSH749@stampy.db.elephantsql.com:5432/eixtvjdc";

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM score', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
      console.log(result.rows);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
})
app.post('/updatePos', function(req,res){
  let pg = require('pg');

  console.log(req.body.enemyposx);
  console.log(req.body.enemyposy);
  console.log(req.body.enemyid);
  //or native libpq bindings
  //var pg = require('pg').native

  var conString = "postgres://eixtvjdc:uBl6PUOi6jrTPw2fGkCFYE_7VdGSH749@stampy.db.elephantsql.com:5432/eixtvjdc";

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }

    client.query("UPDATE locations SET spritelocationx = "+req.body.enemyposx+ ", spritelocationy =" + req.body.enemyposy+" WHERE spritetype ='" +req.body.enemyid+"'", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
      console.log(result.rows);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
})
app.post('/updateScore', function(req,res){
  let pg = require('pg');

  console.log(req.body.score);
  //or native libpq bindings
  //var pg = require('pg').native

  var conString = "postgres://eixtvjdc:uBl6PUOi6jrTPw2fGkCFYE_7VdGSH749@stampy.db.elephantsql.com:5432/eixtvjdc";

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }

    client.query("UPDATE score SET score = "+req.body.score, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
      console.log(result.rows);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
})

app.post('/updatePosPlayer', function(req,res){
  let pg = require('pg');

  console.log("playerposx" + req.body.playerposx);
  console.log("playerpoxy" + req.body.playerposy);
  console.log("playerid" + req.body.playerid);
  //or native libpq bindings
  //var pg = require('pg').native

  var conString = "postgres://eixtvjdc:uBl6PUOi6jrTPw2fGkCFYE_7VdGSH749@stampy.db.elephantsql.com:5432/eixtvjdc";

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }

    client.query("UPDATE locations SET spritelocationx = "+req.body.playerposx+ ", spritelocationy =" + req.body.playerposy+" WHERE spritetype ='"+req.body.playerid+"'", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
      console.log(result.rows);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
})
app.post('/highscoreset', function(req,res){
  let pg = require('pg');
  console.log(req.body);
  console.log(req.body.player);
  console.log(req.body.score);
  //or native libpq bindings
  //var pg = require('pg').native

  var conString = "postgres://eixtvjdc:uBl6PUOi6jrTPw2fGkCFYE_7VdGSH749@stampy.db.elephantsql.com:5432/eixtvjdc";

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }

    client.query("INSERT INTO highscores VALUES('"+req.body.player+"',"+req.body.score+")", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
      console.log(result.rows);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
})



let server = app.listen(5000, function(){
  let port = server.address().port;
  console.log('We are on this port:', port);

});
