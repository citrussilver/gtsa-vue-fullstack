import {
    insertLazadaOrder
} from '../models/lazadaModel.js'


export const newLazadaOrder = (req, res) => {
    const data = req.body;
    insertLazadaOrder(data, (err, results) => {
        if(err){
            res.send(err);
        } else{
            res.json(results);
        }
    })
}