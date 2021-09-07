import { 
    getSavingsAcctTransactions, 
    getSavingsAcct1Balance, 
    insertBankCashDeposit, 
    insertBankCashWithdraw,  
    insertBankBillsPayment, 
    insertGCashCashIn, 
    insertBankPrepaidReload
} from '../models/savingsAcctTransactionsModel.js';

// Get All Savings Acct Transactions
export const showSavingsAcctTransactions = (req, res) => {
    getSavingsAcctTransactions((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const showSavingsAcct1Balance = (req, res) => {
    getSavingsAcct1Balance((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const createSavingsAcctTransaction = (req, res) => {
    const data = req.body;
    insertSavingsAcctTransaction(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

// Insert Bank Cash Deposit
export const createBankCashDeposit = (req, res) => {
    const data = req.body;
    insertBankCashDeposit(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const createBankCashWithdraw = (req, res) => {
    const data = req.body;
    insertBankCashWithdraw(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const createBankBillsPayment = (req, res) => {
    const data = req.body;
    insertBankBillsPayment(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const createGCashCashIn = (req, res) => {
    const data = req.body;
    insertGCashCashIn(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const createBankPrepaidReload = (req, res) => {
    const data = req.body;
    insertBankPrepaidReload(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}