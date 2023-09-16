import {
    getShopeeWallet,
    insertShopeeOrder
} from '../models/shopeeModel.js'

export const showShopeeWallet = (req, res) => {
    getShopeeWallet((err, results) => {
        if(err){
            res.send(err);
        } else{
            res.json(results);
        }
    })
}

export const newShopeeOrder = (req, res) => {
    const data = req.body;
    insertShopeeOrder(data, (err, results) => {
        if(err){
            res.send(err);
        } else{
            res.json(results);
        }
    })
}