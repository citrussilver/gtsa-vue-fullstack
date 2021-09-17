import express from 'express';

import { 
    showSavingsAcctTransactions,
    showSavingsAcct1Info,
    showSavingsAcct1BalanceNc,
    createSavingsAcctTransaction,
    createBankCashDeposit,
    createBankCashWithdraw,
    createBankBillsPayment,
    createGCashCashIn,
    createBankPrepaidReload,
    createTransferMoney
} from '../controllers/savingsAcctTransactions.js';

import {
    showGCashAcctInfo,
    showGCashAcctBalanceNc,
    createLoadSale,
    createGCashBillsPayment,
    createGCashIncomeSale,
    createSelfBuyLoad,
    createOnlineShopPay,
    createGCashAdjustment,
    createGCashSendMoney
} from '../controllers/gcashAcctTransactions.js';

const router = express.Router();

router.get('/transactions', showSavingsAcctTransactions);
router.get('/sa/sa1-info', showSavingsAcct1Info);
router.get('/sa/sa1-bal-nc', showSavingsAcct1BalanceNc);
router.get('/gc/gc-info', showGCashAcctInfo);
router.get('/gc/gc-bal-nc', showGCashAcctBalanceNc);

router.post('/transactions/new-sa-transaction', createSavingsAcctTransaction);
router.post('/transactions/new-sa-depo', createBankCashDeposit);
router.post('/transactions/new-sa-wdraw', createBankCashWithdraw);
router.post('/transactions/new-sa-billspay', createBankBillsPayment);
router.post('/transactions/new-sa-gcash-cash-in', createGCashCashIn);
router.post('/transactions/new-sa-prepaid-reload', createBankPrepaidReload);
router.post('/transactions/new-sa-transfer-money', createTransferMoney);

router.post('/transactions/new-gc-loadsale', createLoadSale);
router.post('/transactions/new-gc-billspay', createGCashBillsPayment);
router.post('/transactions/new-gc-income', createGCashIncomeSale);
router.post('/transactions/new-gc-selfbuyload', createSelfBuyLoad);
router.post('/transactions/new-gc-ol-shop-pay', createOnlineShopPay);
router.post('/transactions/new-gc-adjustment', createGCashAdjustment);
router.post('/transactions/new-gc-sendmoney', createGCashSendMoney);

const router = express.Router()

export default router;

