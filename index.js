const express = require('express');
const fs = require('fs');
const app=express();
const myredis = require('./redis.js');


const port= 3000;
app.use('/js',express.static(__dirname+"/node_modules/bootstrap/dist/js"));
app.use('/css',express.static(__dirname+"/node_modules/bootstrap/dist/css"));
app.listen(port, function(){
  console.log('Server Start, Port : '+port);
});

app.get('/',function (req, res){
  fs.readFile('./login.html',function(error,data){
    if(error){
      colsole.log(error);
    }
    else {
      res.writeHead(200,{'Content-Type' : 'text/html'});
      res.end(data);
    }
  });
});

app.get('/main',function (req, res){
  fs.readFile('./MPA.html',function(error,data){
    if(error){
      colsole.log(error);
    }
    else {
      res.writeHead(200,{'Content-Type' : 'text/html'});
      res.end(data);
    }
  });
});
