import express from 'express';
// import bcrypt from 'bcryptjs';
// import uuid from 'uuid';
// import jwt from 'jwt';

import { handlelogin } from '../controllers/auth.js'

import { validateRegister } from '../middleware/users.js'

import { signUpUser } from '../controllers/userSignUp.js'

import { 
    showSa1Transacts,
    showSa2Transacts,
    showAllSavingsAccs,
    newBankCashDeposit,
    newBankCashWithdraw,
    newBankBillsPayment,
    newGCashCashIn,
    newMayaCashIn,
    newBankPrepaidReload,
    newTransferMoney,
    newStorePayment,
    newAdjustment,
    newEarnInterest,
    newTaxWithheld,
    newSalaryIncome,
    newShopeeOLBanking,
    newShopeePayCashIn
} from '../controllers/savingsAcctController.js';

import {
    showAllCcs,
    showCcTransacts,
    newCcOnlinePay,
    newCcNonOnlinePay,
    newCcPromoLoan,
    newCcRefund
} from '../controllers/ccController.js' ;

import {
    showGCashAccts,
    showGCashTransacts,
    filterRemarksGCashTransacts,
    showGCashCustomers,
    newLoadSale,
    newGCashBillsPayment,
    newGCashIncomeSale,
    newSelfBuyLoad,
    newBankTransfer,
    newOnlineShopPay,
    newGCashAdjustment,
    newGCashSendMoney,
    newGCashRefund,
    newPayQr,
    newReceivedMoney
} from '../controllers/gcashController.js';

import {
    showMayaAccts,
    newMayaOnlineShopPay,
    newQrPay,
    newMayaRefund,
    newMayaAdjustment
} from '../controllers/mayaController.js';

import {
    newLazadaOrder
} from '../controllers/lazadaController.js';

import {
    showShopeeWallet,
    newShopeeOrder
} from '../controllers/shopeeController.js';

import { showAllOwnMobileNos } from '../controllers/ownMobileNosController.js';

import { showDeliveryLocations } from '../controllers/deliveryLocationsController.js'

// import {
//     createSessionHandler,
//     getSessionHandler,
//     deleteSessionHandler,
//   } from "./controllers/session.controller.ts";
// import { requireUser } from "./middleware/requireUser";

const router = express.Router();

router.get('/api/sa/get-sa-accounts', showAllSavingsAccs);
router.get('/api/sa/get-sa1-transactions', showSa1Transacts);
router.get('/api/sa/get-sa2-transactions', showSa2Transacts);

router.get('/api/misc/get-own-mobile-nos', showAllOwnMobileNos);
router.get('/api/misc/get-delivery-loc', showDeliveryLocations);

router.get('/api/cc/get-cc-accounts', showAllCcs);
router.get('/api/cc/get-cc-transacts', showCcTransacts);

router.get('/api/shp/get-shpw', showShopeeWallet);

router.get('/api/gcash/get-gcash-accounts', showGCashAccts);
router.get('/api/gcash/get-gcash-transactions', showGCashTransacts);
router.get('/api/gcash/get-gcash-transactions:flStr', filterRemarksGCashTransacts);
router.get('/api/gcash/get-gcash-customers', showGCashCustomers)

router.get('/api/maya/get-maya-accounts', showMayaAccts);

// router.post('/api/new-sa-transaction', newSavingsAcctTransaction);
router.post('/api/sa/save-sa-depo', newBankCashDeposit);
router.post('/api/sa/save-sa-wdraw', newBankCashWithdraw);
router.post('/api/sa/save-sa-billspay', newBankBillsPayment);
router.post('/api/sa/save-gc-cash-in', newGCashCashIn);
router.post('/api/sa/save-maya-cash-in', newMayaCashIn);
router.post('/api/sa/save-sa-prepaid-reload', newBankPrepaidReload);
router.post('/api/sa/save-sa-transfer-money', newTransferMoney);
router.post('/api/sa/save-sa-store-payment', newStorePayment);
router.post('/api/sa/save-sa-adjustment', newAdjustment);
router.post('/api/sa/save-sa-earn-interest', newEarnInterest);
router.post('/api/sa/save-sa-taxwh', newTaxWithheld);
router.post('/api/sa/save-sa-sale-income', newSalaryIncome);
router.post('/api/sa/save-shopee-online-banking', newShopeeOLBanking);
router.post('/api/sa/save-shopee-pay-cash-in', newShopeePayCashIn);

router.post('/api/gcash/save-loadsale', newLoadSale);
router.post('/api/gcash/save-gc-billspay', newGCashBillsPayment);
router.post('/api/gcash/save-gc-income', newGCashIncomeSale);
router.post('/api/gcash/save-selfbuyload', newSelfBuyLoad);
router.post('/api/gcash/save-gc-banktransfer', newBankTransfer);
router.post('/api/gcash/save-ol-shop-pay', newOnlineShopPay);
router.post('/api/gcash/save-gc-adjustment', newGCashAdjustment);
router.post('/api/gcash/save-gc-sendmoney', newGCashSendMoney);
router.post('/api/gcash/save-gc-refund', newGCashRefund);
router.post('/api/gcash/save-pay-qr', newPayQr);
router.post('/api/gcash/save-received-money', newReceivedMoney);

router.post('/api/maya/save-ol-shop-pay', newMayaOnlineShopPay);
router.post('/api/maya/save-qr-pay', newQrPay);
router.post('/api/maya/save-refund', newMayaRefund);
router.post('/api/maya/save-adjustment', newMayaAdjustment);

router.post('/api/cc/save-cc-op', newCcOnlinePay);
router.post('/api/cc/save-cc-nop', newCcNonOnlinePay);
router.post('/api/cc/save-cc-loan', newCcPromoLoan);
router.post('/api/cc/save-cc-refund', newCcRefund);

router.post('/api/lzd/save-lzd-order', newLazadaOrder);

router.post('/api/shp/save-shp-order', newShopeeOrder);

router.post('/api/auth/login', handlelogin);
router.post('/signup', validateRegister, signUpUser);

// router.get('/secret-route', (req, res, next) => {
//     res.send('This is the secret content. Only logged in users can see that!');
// });

// function routes(app) {
//     // login
//     app.post("/api/session", createSessionHandler);
//     // get the current session
  
//     app.get("/api/session", requireUser, getSessionHandler);
//     // logout
//     app.delete("/api/session", requireUser, deleteSessionHandler);
// }

export default router;
// export {routes};

