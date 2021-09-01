import {
    insertLoadSale,
    insertGCashBillsPayment,
    insertGCashIncomeSale,
    insertSelfBuyLoad,
    insertGCashAdjustment
} from '../models/gcashAcctTransactionsModel.js'

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