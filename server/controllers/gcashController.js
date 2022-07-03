import {
    getGCashAccts,
    getGCashTransacts,
    getFilterRemarksGCashTransacts,
    getGCashCustomers,
    insertLoadSale,
    insertGCashBillsPayment,
    insertGCashIncomeSale,
    insertSelfBuyLoad,
    insertBankTransfer,
    insertOnlineShopPay,
    insertGCashAdjustment,
    insertGCashSendMoney,
    insertGCashRefund,
    insertPayQr,
    insertGCashReceivedMoney
} from '../models/gcashModel.js'

export const showGCashTransacts = (req, res) => {
    getGCashTransacts((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const filterRemarksGCashTransacts = (req, res) => {
    let filterString = req.params.flStr;
    let flStr = filterString.replace(':', '');
    getFilterRemarksGCashTransacts(flStr, (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const showGCashAccts = (req, res) => {
    getGCashAccts((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const showGCashCustomers = (req, res) => {
    getGCashCustomers((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const newLoadSale = (req, res) => {
    const data = req.body;
    insertLoadSale(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newGCashBillsPayment = (req, res) => {
    const data = req.body;
    insertGCashBillsPayment(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newGCashIncomeSale = (req, res) => {
    const data = req.body;
    insertGCashIncomeSale(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newSelfBuyLoad = (req, res) => {
    const data = req.body;
    insertSelfBuyLoad(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newBankTransfer = (req, res) => {
    const data = req.body;
    insertBankTransfer(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newOnlineShopPay = (req, res) => {
    const data = req.body;
    insertOnlineShopPay(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
} 

export const newGCashAdjustment = (req, res) => {
    const data = req.body;
    insertGCashAdjustment(data, (err, results) => {
        if(err){
            res.send(err);
        } else{
            res.json(results);
        }
    })
}

export const newGCashSendMoney = (req, res) => {
    const data = req.body;
    insertGCashSendMoney(data, (err, results) => {
        if(err){
            res.send(err);
        } else{
            res.json(results);
        }
    })
}

export const newGCashRefund = (req, res) => {
    const data = req.body;
    insertGCashRefund(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newPayQr = (req, res) => {
    const data = req.body;
    insertPayQr(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newReceivedMoney = (req, res) => {
    const data = req.body;
    insertGCashReceivedMoney(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}
