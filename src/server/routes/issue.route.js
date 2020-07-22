// wallet.route.js
import express from 'express';
import issueCtrl from '../controllers/issue.controller';

const router = express.Router();

router.route('/')
.get(issueCtrl.issueGet)
.post(issueCtrl.issuePost); /** 新增 User 值組 */

export default router;