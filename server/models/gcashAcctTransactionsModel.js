import dbConnection from '../config/database.js';

export const insertLoadSale = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?",  {
        date_time: data.date_time,
        transaction_type_id: data.transaction_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: data.remarks
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const load_sale_data = {
                gcash_transact_id: results.insertId,
                customer_id: data.customer_id,
                date_time: data.date_time,
                mobile_number: data.mobile_number,
                network: data.network,
                remarks: data.remarks,
                amount: data.amount,
                payment_date: data.payment_date
            };

            dbConnection.query("INSERT INTO gcash_load_sale SET ?", load_sale_data, (err, results) => {
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

export const insertGCashBillsPayment = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", data, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const bills_payment_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                amount: data.amount,
                remarks: data.remarks
            };

            dbConnection.query("INSERT INTO gcash_bills_payment SET ?", bills_payment_data, (err, results) => {
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

// Insert GCash Sale / Income
export const insertGCashIncomeSale = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", data, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const income_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                amount: data.amount,
                description: data.remarks
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
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        date_time: data.date_time,
        transaction_type_id: data.transaction_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: data.remarks
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const self_buy_load_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                mobile_number: data.mobile_number,
                network: data.network,
                remarks: data.remarks,
                amount: data.amount
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


//insertGCashAdjustment

export const insertGCashAdjustment = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        date_time: data.date_time,
        transaction_type_id: data.transaction_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: data.remarks
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const adjustment_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                credit: data.credit,
                amount: data.amount,
                remarks: data.remarks,
            };

            dbConnection.query("INSERT INTO gcash_adjustment SET ?", adjustment_data, (err, results) => {
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
