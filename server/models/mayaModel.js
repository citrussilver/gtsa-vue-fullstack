
import dbConnection from '../config/database.js';

export const getMayaAccts = (result) => {
    dbConnection.query('SELECT id, account_nick, last_4_digits, balance, FORMAT(balance, 2) as balance_wc FROM maya_account', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const insertOnlineShopPay = (data, result) => {
    dbConnection.query("INSERT INTO maya_transactions SET ?", {
        maya_id: data.maya_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_maya_balance: data.current_balance,
        amount: data.amount,
        remarks: `[Online Payment - ${data.online_shop_website}] ${data.remarks}`,
        reference_id: data.reference_id
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const online_shop_payment_data = {
                maya_transact_id: results.insertId,
                date_time: data.date_time,
                online_shop_website: data.online_shop_website,
                amount: data.amount,
                remarks: data.remarks,
            };

            dbConnection.query("INSERT INTO maya_online_shop_payment SET ?", online_shop_payment_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log(`[Maya] Payment to ${online_shop_payment_data.online_shop_website} successfully posted to database`)
                }
            });
        }
    });
}

export const insertQrPay = (data, result) => {
    dbConnection.query("INSERT INTO maya_transactions SET ?", {
        maya_id: data.maya_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_maya_balance: data.current_balance,
        amount: data.amount,
        remarks: `[QR Pay] ${data.remarks}`,
        reference_id: data.reference_id
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const qr_pay_data = {
                maya_transact_id: results.insertId,
                date_time: data.date_time,
                store_name: data.store_name,
                amount: data.amount,
                description: data.description
            };

            dbConnection.query("INSERT INTO maya_qr_pay SET ?", qr_pay_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log(`[Maya] New QR Pay to ${qr_pay_data.store_name} successfully posted to database`)
                }
            });
        }
    });
}

export const insertMayaRefund = (data, result) => {
    dbConnection.query("INSERT INTO maya_transactions SET ?", {
        maya_id: data.maya_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_maya_balance: data.current_balance,
        amount: data.amount,
        remarks: `[Refund] ${data.remarks}`,
        reference_id: data.reference_id
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const refund_data = {
                maya_transact_id: results.insertId,
                date_time: data.date_time,
                amount: data.amount,
                description: data.remarks
            };

            dbConnection.query("INSERT INTO maya_refund SET ?", refund_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Maya] New Refund successfully posted to database')
                }
            });
        }
    });
}

export const insertMayaAdjustment = (data, result) => {
    dbConnection.query("INSERT INTO maya_transactions SET ?", {
        maya_id: data.maya_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_maya_balance: data.current_balance,
        amount: data.amount,
        remarks: `[Adjustment] ${data.remarks}`,
        reference_id: data.reference_id
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const adjustment_data = {
                maya_transact_id: results.insertId,
                date_time: data.date_time,
                credit: data.credit,
                amount: data.amount,
                remarks: data.remarks,
            };

            dbConnection.query("INSERT INTO maya_adjustments SET ?", adjustment_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log(`[Maya] New Adjustment ${adjustment_data.credit == 1 ? "(Credit)" : "(Debit)"} successfully posted to database`)
                }
            });
        }
    });
}

export const insertSelfBuyLoad = (data, result) => {
    dbConnection.query("INSERT INTO maya_transactions SET ?", {
        maya_id: data.maya_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_maya_balance: data.current_balance,
        amount: data.amount,
        remarks: `[Self Buy Load] ${data.remarks}`,
        reference_id: data.reference_id
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const self_buy_load_data = {
                transact_id: results.insertId,
                date_time: data.date_time,
                mobile_number: data.mobile_number,
                network: data.network,
                remarks: data.remarks,
                amount: data.amount,
                source: 'Maya'
            };

            dbConnection.query("INSERT INTO self_buy_load SET ?", self_buy_load_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Maya] New Self Buy Load successfully posted to database')
                }
            });
        }
    });
}

// miscellaneous maya cash-in - used when current balance gap with actual is high
export const insertMayaCashIn = (data, result) => {
    dbConnection.query("INSERT INTO maya_transactions SET ?", {
        maya_id: data.maya_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_maya_balance: data.current_balance,
        amount: 0,
        remarks: `[Maya Cash-In] ${data.remarks}`,
        reference_id: data.reference_id
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const maya_cash_in_data = {
                maya_transact_id: results.insertId,
                // date_time: data.date_time,
                sa_transact_id: null,
                remarks: data.remarks,
                amount: data.amount
            };

            dbConnection.query("INSERT INTO maya_cash_in SET ?", maya_cash_in_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Maya] New Maya cash-in record successfully posted to database')
                }
            });
        }
    });
}

export const insertMayaBillsPay = (data, result) => {
    dbConnection.query("INSERT INTO maya_transactions SET ?", {
        maya_id: data.maya_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_maya_balance: data.current_balance,
        amount: data.amount,
        remarks: `[Maya Bills Payment] ${data.remarks}`,
        reference_id: data.reference_id
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const bills_payment_data = {
                maya_transact_id: results.insertId,
                date_time: data.date_time,
                biller_merchant: data.biller_merchant,
                amount: data.amount,
                remarks: data.remarks
            };

            dbConnection.query("INSERT INTO maya_bills_payment SET ?", bills_payment_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log(`[Maya] New Maya Bills payment to ${bills_payment_data.biller_merchant} successfully posted to database`)
                }
            });
        }
    });
}