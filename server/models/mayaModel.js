
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
        current_maya_balance: data.current_maya_balance,
        amount: data.amount,
        remarks: `[Online Payment - ${data.online_shop_website}] ${data.remarks}`,
        ref_no: data.ref_no
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
        current_maya_balance: data.current_maya_balance,
        amount: data.amount,
        remarks: `[QR Pay] ${data.remarks}`,
        ref_no: data.ref_no
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