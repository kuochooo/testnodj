// wallet.module.js
import mysql from 'mysql';
import config from '../../config/config';

const MongoClient = require('mongodb').MongoClient;

/* wallet  POST 新增 */
const createwallet = (insertValues) => { 
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://35.241.103.219:27017/MyDb",function(connerr,client){
   if(connerr) {
     reject(connerr);
   }
   var db=client.db('MyDb');
   insertValues.WalletID=insertValues.BankID+'-'+padLeft(getRandom(1,999999999999999),16);
   delete insertValues.BankID;
    db.collection('wallet',function(werr,collection){
    collection.insert(insertValues);
    collection.count(function(err,count){
        if(err){
          reject(err);
        } 
        console.log('Total Rows:'+count);
        resolve({'Total Rows':count});
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

// export default {
//   createwallet
// };

/*  wallet GET 取得  */
const selectwallet = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://35.241.103.219:27017/MyDb",function(connerr,client){
      if(connerr) {
        reject(connerr);
      }
      var db=client.db('MyDb');
      db.collection("wallet").find({}).toArray(function(err, result) {
        if (err) throw reject(connerr);
        resolve(result);
        client.close();
      });
      
       });    
   }); 
  };
  export default {
    createwallet,
    selectwallet
  };