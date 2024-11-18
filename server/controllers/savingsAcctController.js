import { 
    getSa1Transacts,
    getSa2Transacts,
    getAllSavingsAccs, 
    insertBankCashDeposit, 
    insertBankCashWithdraw,  
    insertBankBillsPayment, 
    insertGCashCashIn,
    insertMayaCashIn, 
    insertBankPrepaidReload, 
    insertTransferMoney,
    insertStorePayment,
    insertAdjustment,
    insertEarnInterest,
    insertTaxWithheld,
    insertSalaryIncome,
    insertShopeeOLBanking,
    insertShopeePayCashIn
} from '../models/savingsAcctModel.js';

// Get All Savings Acct Transactions
export const showSa1Transacts = (req, res) => {
    getSa1Transacts((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const showSa2Transacts = (req, res) => {
    getSa2Transacts((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const showAllSavingsAccs = (req, res) => {
    getAllSavingsAccs((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// export const newSavingsAcctTransaction = (req, res) => {
//     const data = req.body;
//     insertSavingsAcctTransaction(data, (err, results) => {
//         if (err){
//             res.send(err);
//         } else{
//             res.json(results);
//         }
//     });
// }

// Insert Bank Cash Deposit
export const newBankCashDeposit = (req, res) => {
    const data = req.body;
    insertBankCashDeposit(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newBankCashWithdraw = (req, res) => {
    const data = req.body;
    insertBankCashWithdraw(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newBankBillsPayment = (req, res) => {
    const data = req.body;
    insertBankBillsPayment(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newGCashCashIn = (req, res) => {
    const data = req.body;
    insertGCashCashIn(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newMayaCashIn = (req, res) => {
    const data = req.body;
    insertMayaCashIn(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newBankPrepaidReload = (req, res) => {
    const data = req.body;
    insertBankPrepaidReload(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newTransferMoney = (req, res) => {
    const data = req.body;
    insertTransferMoney(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newStorePayment = (req, res) => {
    const data = req.body;
    insertStorePayment(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newAdjustment = (req, res) => {
    const data = req.body;
    insertAdjustment(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newEarnInterest = (req, res) => {
    const data = req.body;
    insertEarnInterest(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newTaxWithheld = (req, res) => {
    const data = req.body;
    insertTaxWithheld(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newSalaryIncome = (req, res) => {
    const data = req.body;
    insertSalaryIncome(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const newShopeeOLBanking = (req, res) => {
    const data = req.body;
    insertShopeeOLBanking(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}

export const newShopeePayCashIn = (req, res) => {
    const data = req.body;
    insertShopeePayCashIn(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}