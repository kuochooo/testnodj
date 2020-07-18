// wallet.controller.js
import walletModule from '../modules/wallet.module';

const walletGet = (req, res) => {
	walletModule.selectwallet().then((result) => {
		res.send(JSON.stringify(result)); // 成功回傳result結果
	}).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
  };

var querystring = require('querystring');
/* wallet  POST 新增 */
var params = [];
const walletPost = (req, res) => {
  // 取得新增參數
  req.setEncoding('utf-8');
	var postData = '';		  
	req.addListener("data", function (postDataChunk) {
		postData += postDataChunk;
	});		  
	req.addListener("end", function () {
		
		if(req.headers['content-type']=='application/json') {
			params = JSON.parse(postData);
		} else {
			params = querystring.parse(postData);	
    }
    console.log(params.walletType);
	});	

  walletModule.createwallet(params).then((result) => {
    res.send(JSON.stringify(result)); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};



export default {
  walletPost,
  walletGet
};