// issue.controller.js
import issueModule from '../modules/issue.module';



var querystring = require('querystring');



/* issue  POST 新增 */
var params = [];

const issueGet = (req, res) => {
	issueModule.selectissue(req.params.walletID).then((result) => {
		res.send(JSON.stringify(result)); // 成功回傳result結果
	}).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
  };

const issuePost = (req, res) => {
  // 取得新增參數
  params=getData(req);
  issueModule.createissue(params).then((result) => {
    res.send(JSON.stringify(result)); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

function getData(req) {
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
    console.log(params.issueType);
    return params;
	});	
}

export default {
  issuePost,
  issueGet
};