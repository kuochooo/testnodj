import express from 'express';
import mysql from 'mysql';

import config from './../../config/config';
import wallet from './wallet.route';
import issue from './issue.route';
import transfer from './transfer.route';

const router = express.Router();
router.use('/wallet', wallet);
//router.use('/issue', issue);
//router.use('/transfer', transfer);

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

/* mysql連線測試 */
router.get('/sqlTest', (req, res) => {
  const connectionPool = mysql.createPool({ // 建立一個連線池
    connectionLimit: '10', // 限制池子連線人數
    host: config.mysqlHost, // 主機名稱
    user: config.mysqlUserName, // 用戶名稱 
    password: config.mysqlPass, // 資料庫密碼
    database: config.mysqlDatabase // 資料庫名稱
  });
  connectionPool.getConnection((err, connection) => { //建立一個連線若錯誤回傳err
    //throw new Error("error");
    if (err) {
      res.send(err);
      console.log('連線失敗！');
    } else {
      res.send('連線成功！');
      console.log(connection);
    }
  });
});

export default router;