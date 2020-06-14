const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

client.set("key", "value", redis.print);
client.get("key", redis.print);

exports.helloWorld = function(){
  console.log('hello redis!');
  return 'hello redis!';
};
