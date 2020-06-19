const express = require('express');
const fs = require('fs');
const app=express();
const myport= 3000;
const redis = require('redis');
const redisClient=redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  db: 1
});

var un_string;

app.use('/js',express.static(__dirname+"/node_modules/bootstrap/dist/js"));
app.use('/css',express.static(__dirname+"/node_modules/bootstrap/dist/css"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine','ejs');

app.listen(myport, function(){
  console.log('Server Start, Port : '+myport);
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

app.post('/',function(req,res){
  var username = req.body.username;
  un_string=username;

  res.json({
    result: "post정상작동"
  });
});

app.get('/main',function (req, res){
  fs.readFile('./MPA.html',function(error,data){
    if(error){
      console.log(error);
    }
    else {
      res.writeHead(200,{'Content-Type' : 'text/html'});
      res.end(data);
    }
  });
});

app.put('/main',function (req, res){
  var exists;
  var link_list;

  redisClient.exists(un_string,(err,result)=>{
    if(err){
      console.log('exists error',err);
    }
    else{
      console.log('exists success');
      console.log(result);
      exists=res;
    }
  });

  if(exists)
  {
  }
  else {
    redisClient.hset(un_string,"empty","empty",(err)=>{
      if(err){
        console.log('set error',err);
      }
      else{
        console.log('set success');
      }
    });
  }

  redisClient.hgetall(un_string,(err,result)=>{
    if(err){
      console.log('hgetall error',err);
    }
    else{
      console.log('hgetall success');
      console.log(typeof result);
      res.json({
          linklist: result
      });
    }
  })

});

app.delete('/main',function(req,res){
  var username = req.body.username;
  var title = req.body.title;
  console.log('delete요청',username,title);

  redisClient.hdel(username,title,(err)=>{
    if(err){
      console.log('del error',err);
    }
    else{
      console.log('del success');
    }
  })


  res.json({
    result: "delete정상작동"
  });
});

app.post('/main',function(req,res){
  var username = req.body.username;
  var title = req.body.title;
  var url = req.body.url;
  console.log('post요청',username,title,url);

  redisClient.hset(username,title,url,(err)=>{
    if(err){
      console.log('set error',err);
    }
    else{
      console.log('set success');
    }
  });

  res.json({
    result: "post정상작동"
  });
});
