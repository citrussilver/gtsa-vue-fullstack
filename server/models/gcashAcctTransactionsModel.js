import dbConnection from '../config/database.js';

export const getGCashTransactions = (result) => {
    dbConnection.query('SELECT gcash_transact_id, date_time AS date_time_og, DATE_FORMAT(date_time,"%a, %b %d, %Y  %H:%i") AS date_time, gtt.description as transact_type, FORMAT(current_gcash_balance,2) AS current_gcash_balance, FORMAT(amount,2) AS amount, FORMAT(post_gcash_balance,2) AS post_gcash_balance, remarks FROM gcash_transactions gt JOIN gcash_transaction_type gtt ON gt.transaction_type_id = gtt.transaction_type_id ORDER BY date_time_og DESC LIMIT 20', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const getGCashAcctInfo = (result) => {
    dbConnection.query('SELECT account_nickname, FORMAT(balance, 2) AS balance FROM gcash_account WHERE id = 1', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const getGCashAcctBalanceNc = (result) => {
    dbConnection.query('SELECT balance FROM gcash_account WHERE id = 1', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const getGCashCustomers = (result) => {
    dbConnection.query('SELECT customer_id, name FROM gcash_customers', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const insertLoadSale = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?",  {
        gcash_id: data.gcash_id,
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
                    console.log('[GCash] New Load Sale successfully posted to database')
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
                    console.log('[GCash] New Bills payment successfully posted to database')
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
                    console.log('[GCash] New Sale / Income successfully posted to database')
                }
            });
        }
    });
}

//Self Buy Load

export const insertSelfBuyLoad = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
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
                    console.log('[GCash] New Self Buy Load successfully posted to database')
                }
            });
        }
    });
}

export const insertOnlineShopPay = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
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
            const online_shop_payment_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                online_shop_website: data.online_shop_website,
                amount: data.amount,
                remarks: data.remarks,
            };

            dbConnection.query("INSERT INTO gcash_online_shop_payment SET ?", online_shop_payment_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[GCash] New Online Shop Payment successfully posted to database')
                }
            });
        }
    });
}


//insertGCashAdjustment

export const insertGCashAdjustment = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
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
                    console.log('[GCash] New Adjustment successfully posted to database')
                }
            });
        }
    });
}

export const insertGCashSendMoney = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
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
            const send_money_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                mobile_number: data.mobile_number,
                amount: data.amount,
                remarks: data.remarks,
                message: data.message,
                attachment: data.attachment
            };

            dbConnection.query("INSERT INTO gcash_send_money SET ?", send_money_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[GCash] New Send Money w/ clip successfully posted to database')
                }
            });
        }
    });
}

export const insertGCashRefund = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", data, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const refund_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                amount: data.amount,
                description: data.remarks
            };

            dbConnection.query("INSERT INTO gcash_refund SET ?", refund_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[GCash] New Refund successfully posted to database')
                }
            });
        }
    });
}
