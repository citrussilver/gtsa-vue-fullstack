import dbConnection from '../config/database.js';

export const getShopeeWallet = (result) => {
    dbConnection.query('SELECT id, account_name, coins, balance, FORMAT(balance, 2) AS balance_wc FROM shopee_wallets', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}


export const insertShopeeOrder = (data, result) => {
    // console.log(data);

    dbConnection.query("INSERT INTO shopee_transactions SET ?", {
        payment_method: data.payment_method,
        date_time: data.date_time,
        delivery_location: data.delivery_location,
        order_id: data.order_id,
        description: data.description,
        remarks: data.remarks,
        store_name: data.store_name,
        merch_subtotal: data.merch_subtotal,
        shipping_fee: data.shipping_fee,
        shipping_fee_discount: data.shipping_fee_discount,
        store_discount: data.store_discount,
        voucher_discount: data.voucher_discount,
        coins: data.coins,
        bundle_deals_savings: data.bundle_deals_savings,
        sub_total: data.sub_total,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            let default_log = '[Shopee] New Shopee order successfully posted to database.\n'

            if(data.payment_method == 2) {
                // fill up gcash_transactions data
                const gcash_data = {
                    gcash_id: 1,
                    date_time: data.date_time,
                    transact_type_id: 7,
                    current_gcash_balance: data.current_gcash_balance,
                    amount: data.sub_total,
                    remarks: `[Online Payment - Shopee] ${data.description}`
                };

                dbConnection.query("INSERT INTO gcash_transactions SET ?", gcash_data, (err, results) => {
                    if(err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, results);
                        default_log+= '[GCash] Payment to Shopee successfully posted to database';
                    }
                });
            }

            if(data.payment_method == 3) {
                const maya_data = {
                    maya_id: 1,
                    date_time: data.date_time,
                    transact_type_id: 1,
                    current_maya_balance: data.current_maya_balance,
                    amount: data.sub_total,
                    remarks: `[Online Payment - Shopee] ${data.description}`,
                    ref_no: data.ref_no
                };

                dbConnection.query("INSERT INTO maya_transactions SET ?", maya_data, (err, results) => {
                    if(err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, results);
                        default_log+= '[Maya] Payment to Shopee successfully posted to database';
                    }
                });
            }

            if(data.payment_method == 4) {
                const cc_data = {
                    credit_card_id: data.credit_card_id,
                    date_time: data.date_time,
                    transact_type_id: 1,
                    description: data.description,
                    current_credit_limit: data.current_credit_limit,
                    amount: data.sub_total,
                    remarks: `[Online Payment - Shopee] ${data.remarks}`,
                    ref_no: data.ref_no
                };

                dbConnection.query("INSERT INTO credit_card_transactions SET ?", cc_data, (err, results) => {
                    if(err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, results);
                        default_log+= '[Credit Card] Payment to Shopee successfully posted to database';
                    }
                });
            }

            // show message on server console
            console.log(default_log);
        }
    });
}