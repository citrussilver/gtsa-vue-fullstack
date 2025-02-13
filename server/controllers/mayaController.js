import {
    getMayaAccts,
    getMayaTransacts,
    insertOnlineShopPay,
    insertMayaBillsPay,
    insertQrPay,
    insertMayaRefund,
    insertMayaAdjustment,
    insertSelfBuyLoad,
    insertMayaCashIn
} from '../models/mayaModel.js'

export const showMayaAccts = (req, res) => {
    getMayaAccts((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
export const showMayaTransacts = (req, res) => {
    getMayaTransacts((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const newMayaOnlineShopPay = (req, res) => {
    const data = req.body;
    insertOnlineShopPay(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newQrPay = (req, res) => {
    const data = req.body;
    insertQrPay(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newMayaRefund = (req, res) => {
    const data = req.body;
    insertMayaRefund(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newMayaAdjustment = (req, res) => {
    const data = req.body;
    insertMayaAdjustment(data, (err, results) => {
        if(err){
            res.send(err);
        } else{
            res.json(results);
        }
    })
}

export const newMayaSelfBuyLoad = (req, res) => {
    const data = req.body;
    insertSelfBuyLoad(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newMayaCashIn = (req, res) => {
    const data = req.body;

    insertMayaCashIn(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newMayaBillsPay = (req, res) => {
    const data = req.body;

    insertMayaBillsPay(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}