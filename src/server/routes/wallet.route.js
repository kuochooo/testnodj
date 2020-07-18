// wallet.route.js
import express from 'express';
import walletCtrl from '../controllers/wallet.controller';

const router = express.Router();

router.route('/')
.get(walletCtrl.walletGet)
.post(walletCtrl.walletPost); /** 新增 User 值組 */

export default router;