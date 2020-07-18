var MongoClient=require('mongodb').MongoClient;
 
MongoClient.connect("mongodb://35.241.103.219:27017/MyDb",function(connerr,client){
  if(connerr) {
    console.log(connerr);
  }
  var db=client.db('MyDb');
  db.collection("wallet").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    client.close();
  });
  
   });
