import express from 'express';

import { handlelogin } from '../controllers/auth.js'

import { validateRegister } from '../middleware/users.js'

import { signUpUser } from '../controllers/userSignUp.js'

import { 
    showSa1Transacts,
    showSa2Transacts,
    showAllSavingsAccs,
    newSavingsAcctTransaction,
    newBankCashDeposit,
    newBankCashWithdraw,
    newBankBillsPayment,
    newGCashCashIn,
    newBankPrepaidReload,
    newTransferMoney,
    newAdjustment,
    newEarnInterest,
    newTaxWithheld
} from '../controllers/savingsAcctController.js';

import {
    showAllCcs,
    showCcTransacts,
    newCcOnlinePay,
    newCcNonOnlinePay,
    newCcPromoLoan
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
    newPayQr
} from '../controllers/gcashController.js';

// import {
//     createSessionHandler,
//     getSessionHandler,
//     deleteSessionHandler,
//   } from "./controllers/session.controller.ts";
// import { requireUser } from "./middleware/requireUser";

const router = express.Router();

router.get('/sa/sa-accs', showAllSavingsAccs);
router.get('/sa1/tr', showSa1Transacts);
router.get('/sa2/tr', showSa2Transacts);

router.get('/cc/cc-accs', showAllCcs);
router.get('/cc/tr', showCcTransacts);

router.get('/gc/gc-accs', showGCashAccts);
router.get('/gc/tr', showGCashTransacts);
router.get('/gc/tr/:flStr', filterRemarksGCashTransacts);
router.get('/gc/gc-custs', showGCashCustomers)

router.post('/tr/new-sa-transaction', newSavingsAcctTransaction);
router.post('/tr/new-sa-depo', newBankCashDeposit);
router.post('/tr/new-sa-wdraw', newBankCashWithdraw);
router.post('/tr/new-sa-billspay', newBankBillsPayment);
router.post('/tr/new-sa-gc-ci', newGCashCashIn);
router.post('/tr/new-sa-prepaid-reload', newBankPrepaidReload);
router.post('/tr/new-sa-transfer-money', newTransferMoney);
router.post('/tr/new-sa-adjustment', newAdjustment);
router.post('/tr/new-sa-ei', newEarnInterest);
router.post('/tr/new-sa-tw', newTaxWithheld);

router.post('/tr/new-gc-loadsale', newLoadSale);
router.post('/tr/new-gc-billspay', newGCashBillsPayment);
router.post('/tr/new-gc-income', newGCashIncomeSale);
router.post('/tr/new-gc-selfbuyload', newSelfBuyLoad);
router.post('/tr/new-gc-btr', newBankTransfer);
router.post('/tr/new-gc-ol-shop-pay', newOnlineShopPay);
router.post('/tr/new-gc-adjustment', newGCashAdjustment);
router.post('/tr/new-gc-sendmoney', newGCashSendMoney);
router.post('/tr/new-gc-refund', newGCashRefund);
router.post('/tr/new-gc-pay-qr', newPayQr);

router.post('/tr/new-cc-op', newCcOnlinePay);
router.post('/tr/new-cc-nop', newCcNonOnlinePay);
router.post('/tr/new-cc-loan', newCcPromoLoan);

router.post('/login', handlelogin);
router.post('/signup', validateRegister, signUpUser);

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

