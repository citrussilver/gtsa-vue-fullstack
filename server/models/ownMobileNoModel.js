import dbConnection from '../config/database.js';

export const getAllOwnMobileNos = (result) => {
    dbConnection.query('SELECT id, mobile_number, alias, network FROM own_mobile_phone_nos', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}