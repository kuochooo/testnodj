// param-validation.js
import Joi from 'joi';

export default {
  // POST /api/article
  createwallet: {
    body: {
      walletType: Joi.number().required(), // 數字＋必填
      BankID: Joi.string().required(), // 字串＋必填
      CBDCPuk: Joi.string().required() // 字串＋必填
    }
  },

};