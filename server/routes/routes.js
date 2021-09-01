import express from 'express';

import { 
    showSavingsAcctTransactions,
    createSavingsAcctTransaction,
    createBankCashDeposit,
    createBankCashWithdraw,
    createBankBillsPayment,
    createGCashTransaction,
    createGCashCashIn,
    createBankPrepaidReload
} from '../controllers/savingsAcctTransactions.js';

import {
    createLoadSale,
    createGCashBillsPayment,
    createGCashIncomeSale,
    createSelfBuyLoad,
    createGCashAdjustment
} from '../controllers/gcashAcctTransactions.js';

const router = express.Router();

// Get All Savings Account Transactions
router.get('/transactions', showSavingsAcctTransactions);

router.post('/transactions/new-sa-transaction', createSavingsAcctTransaction);
router.post('/transactions/new-sa-depo', createBankCashDeposit);
router.post('/transactions/new-sa-wdraw', createBankCashWithdraw);
router.post('/transactions/new-sa-billspay', createBankBillsPayment);
router.post('/transactions/new-sa-gcash-tr', createGCashTransaction);
router.post('/transactions/new-sa-gcash-cash-in', createGCashCashIn);
router.post('/transactions/new-sa-prepaid-reload', createBankPrepaidReload);

router.post('/transactions/new-gc-loadsale', createLoadSale);
router.post('/transactions/new-gc-billspay', createGCashBillsPayment);
router.post('/transactions/new-gc-income', createGCashIncomeSale);
router.post('/transactions/new-gc-selfbuyload', createSelfBuyLoad);
router.post('/transactions/new-gc-adjustment', createGCashAdjustment);

export default router;

