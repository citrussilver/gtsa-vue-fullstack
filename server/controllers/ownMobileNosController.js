import { getAllOwnMobileNos } from '../models/ownMobileNoModel.js';

export const showAllOwnMobileNos = (req, res) => {
    getAllOwnMobileNos((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}