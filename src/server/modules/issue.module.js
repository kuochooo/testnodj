// issue.module.js
import { object } from 'joi';

const MongoClient = require('mongodb').MongoClient;

/* issue  POST 新增 */
const createissue = (insertValues) => { 
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://35.241.103.219:27017/MyDb",function(connerr,client){
   if(connerr) {
     reject(connerr);
   }
   
   issueObj = new object();
   issueObj.Amount=insertValues.Amount;
   issueObj.utxoID=padLeft(getRandom(1,999999999999999),16);
   issueObj.owner=insertValues.walletID;
   issueObj.transfer='';
   issueObj.cc='';
   
   issueLog=new object();
   issueLog.owner=insertValues.walletID;
   issueLog.Amount=insertValues.Amount;
   issueLog.utxoID=issueObj.utxoID;

   var db=client.db('MyDb');
   
    db.collection('issue',function(werr,collection){
    collection.insert(issueObj);
    collection.count(function(err,count){
        if(err){
          reject(err);
        } 
        resolve({'issueToken':utxoID,'issueAmount':Amount});
    });
  });

  db.collection('issueLog',function(werr,collection){
    collection.insert(issueLog);
    collection.count(function(err,count){
        if(err){
          reject(err);
        } 
    });
  });

  client.close(); //關閉連線
});
    
  });
};

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
};

function padLeft(str, len) {
  str = '' + str;
  if (str.length >= len) {
      return str;
  } else {
      return padLeft("0" + str, len);
  }
}

/*  issue GET 取得  */
const selectissue = (values) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://35.241.103.219:27017/MyDb",function(connerr,client){
      if(connerr) {
        reject(connerr);
      }
      var db=client.db('MyDb');
      db.collection("issueLog").find({'walletID':values}).toArray(function(err, result) {
        if (err) throw reject(connerr);
        resolve(result);
        client.close();
      });
      
       });    
   }); 
  };
  export default {
    createissue,
    selectissue
  };