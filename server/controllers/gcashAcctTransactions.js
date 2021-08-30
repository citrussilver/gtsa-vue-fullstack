import {
    insertGCashIncomeSale,
    insertSelfBuyLoad
} from '../models/gcashAcctTransactionsModel.js'

export const createGCashIncomeSale = (req, res) => {
    const data = req.body;
    console.log(data)
    insertGCashIncomeSale(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const createSelfBuyLoad = (req, res) => {
    const data = req.body;
    insertSelfBuyLoad(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}