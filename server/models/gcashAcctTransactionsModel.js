import dbConnection from '../config/database.js';

// Insert GCash Sale / Income
export const insertGCashIncomeSale = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const income_data = {
                gcash_transact_id: results.insertId,
                date_time: dateTime,
                amount: amount,
                description: remarks
            };

            dbConnection.query("INSERT INTO gcash_income SET ?", income_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                }
            });
        }
    });
}

//Self Buy Load

export const insertSelfBuyLoad = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const self_buy_load_data = {
                gcash_transact_id: results.insertId,
                date_time: dateTime,
                mobile_number: mobile_no,
                amount: amount,
                remarks: remarks
            };

            dbConnection.query("INSERT INTO self_buy_load SET ?", self_buy_load_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                }
            });
        }
    });
}
