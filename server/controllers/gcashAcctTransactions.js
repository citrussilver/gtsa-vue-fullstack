import {
    getGCashAcctInfo,
    getGCashAcctBalanceNc,
    insertLoadSale,
    insertGCashBillsPayment,
    insertGCashIncomeSale,
    insertSelfBuyLoad,
    insertOnlineShopPay,
    insertGCashAdjustment,
    insertGCashSendMoney
} from '../models/gcashAcctTransactionsModel.js'

export const showGCashAcctInfo = (req, res) => {
    getGCashAcctInfo((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const showGCashAcctBalanceNc = (req, res) => {
    getGCashAcctBalanceNc((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const createLoadSale = (req, res) => {
    const data = req.body;
    insertLoadSale(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const createGCashBillsPayment = (req, res) => {
    const data = req.body;
    insertGCashBillsPayment(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const createGCashIncomeSale = (req, res) => {
    const data = req.body;
    insertGCashIncomeSale(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const createSelfBuyLoad = (req, res) => {
    const data = req.body;
    insertSelfBuyLoad(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const createOnlineShopPay = (req, res) => {
    const data = req.body;
    insertOnlineShopPay(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
} 

export const createGCashAdjustment = (req, res) => {
    const data = req.body;
    insertGCashAdjustment(data, (err, results) => {
        if(err){
            res.send(err);
        } else{
            res.json(results);
        }
    })
}

export const createGCashSendMoney = (req, res) => {
    const data = req.body;
    insertGCashSendMoney(data, (err, results) => {
        if(err){
            res.send(err);
        } else{
            res.json(results);
        }
    })
}