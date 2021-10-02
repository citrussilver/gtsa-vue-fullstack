import {
    getAllCcs,
    getCcTransacts,
    insertCcOnlinePay,
    insertCcNonOnlinePay,
    insertCcPromoLoan
} from '../models/ccModel.js'

export const showAllCcs = (req, res) => {
    getAllCcs((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const showCcTransacts = (req, res) => {
    getCcTransacts((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
} 

export const newCcOnlinePay = (req, res) => {
    const data = req.body;
    insertCcOnlinePay(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newCcNonOnlinePay = (req, res) => {
    const data = req.body;
    insertCcNonOnlinePay(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

export const newCcPromoLoan = (req, res) => {
    const data = req.body;
    insertCcPromoLoan(data, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}