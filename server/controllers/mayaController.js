import {
    getMayaAccts,
    insertOnlineShopPay,
    insertQrPay,
    insertMayaRefund,
    insertMayaAdjustment
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