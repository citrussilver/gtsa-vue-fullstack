import {
    getMayaAccts,
    insertOnlineShopPay
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