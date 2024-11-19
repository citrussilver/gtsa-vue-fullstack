import dbConnection from '../config/database.js';

export const getGCashTransacts = (result) => {
    dbConnection.query(
        `SELECT gcash_transact_id, 
        date_time AS date_time_og, 
        DATE_FORMAT(date_time,"%a, %b %d, %Y  %H:%i") AS date_time, 
        gtt.description as transact_type, 
        FORMAT(current_gcash_balance,2) AS current_gcash_balance, 
        FORMAT(amount,2) AS amount, 
        FORMAT(post_gcash_balance,2) AS post_gcash_balance, 
        remarks 
        FROM gcash_transactions gt 
        INNER JOIN gcash_transaction_type gtt ON gt.transact_type_id = gtt.transact_type_id 
        ORDER BY date_time_og DESC LIMIT 20`, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const getFilterRemarksGCashTransacts = (flStr, result) => {
    // console.log(flStr);
    dbConnection.query(
        `SELECT gcash_transact_id, 
        date_time AS date_time_og, 
        DATE_FORMAT(date_time,"%a, %b %d, %Y  %H:%i") AS date_time, 
        gtt.description as transact_type, 
        FORMAT(current_gcash_balance,2) AS current_gcash_balance, 
        FORMAT(amount,2) AS amount, 
        FORMAT(post_gcash_balance,2) AS post_gcash_balance, 
        remarks 
        FROM gcash_transactions gt 
        INNER JOIN gcash_transaction_type gtt 
        ON gt.transact_type_id = gtt.transact_type_id 
        WHERE remarks LIKE "%${flStr}%" 
        UNION ALL SELECT "-", "-", "-", "Total", "-", FORMAT(SUM(amount),2), "-", "-" 
        FROM gcash_transactions gt 
        INNER JOIN gcash_transaction_type gtt 
        ON gt.transact_type_id = gtt.transact_type_id  
        WHERE remarks LIKE "%${flStr}%"`, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const getGCashAccts = (result) => {
    dbConnection.query('SELECT id, account_nick, last_4_digits, balance, FORMAT(balance, 2) as balance_wc FROM gcash_account', (err, results) => {
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
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Load Sale] ${data.remarks}`,
        ref_no: data.ref_no
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
                    console.log(`[GCash] New Mobile Load Sale to ${load_sale_data.mobile_number} successfully posted to database`)
                }
            });
        }
    });
}

export const insertGCashBillsPayment = (data, result) => {

    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Bills Payment] ${data.remarks}`,
        ref_no: data.ref_no
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const bills_payment_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                biller_merchant: data.biller_merchant,
                amount: data.amount,
                remarks: data.remarks
            };

            dbConnection.query("INSERT INTO gcash_bills_payment SET ?", bills_payment_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log(`[GCash] New Bills payment to ${bills_payment_data.biller_merchant} successfully posted to database`)
                }
            });
        }
    });
}

// Insert GCash Sale / Income
export const insertGCashIncomeSale = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Sale / Income] ${data.remarks}`,
        ref_no: data.ref_no
    }, (err, results) => {
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
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Self Buy Load] ${data.remarks}`,
        ref_no: data.ref_no
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const self_buy_load_data = {
                transact_id: results.insertId,
                date_time: data.date_time,
                mobile_number: data.own_mobile_number,
                network: data.network,
                remarks: data.remarks,
                amount: data.amount,
                source: 'GCash'
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

export const insertBankTransfer = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Bank Transfer] ${data.remarks}`,
        ref_no: data.ref_no
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const bank_transfer_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                acct_no: data.acct_no,
                acct_name: data.acct_name,
                amount: data.amount,
                remarks: data.remarks,
            };

            dbConnection.query("INSERT INTO gcash_send_to_bank SET ?", bank_transfer_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[GCash] New Bank Transfer successfully posted to database')
                }
            });
        }
    });
}

export const insertOnlineShopPay = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Online Payment - ${data.online_shop_website}] ${data.remarks}`,
        ref_no: data.ref_no
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
                    console.log(`[GCash] Payment to ${online_shop_payment_data.online_shop_website} successfully posted to database`)
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
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Adjustment] ${data.remarks}`
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
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Send Money] ${data.remarks}`,
        ref_no: data.ref_no
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const send_money_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                mobile_number: data.mobile_number,
                type: data.type,
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
                    console.log(`[GCash] New Send Money sent to ${send_money_data.mobile_number} successfully posted to database`)
                }
            });
        }
    });
}

export const insertGCashRefund = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Refund] ${data.remarks}`,
    }, (err, results) => {
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

export const insertPayQr = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Pay QR] ${data.remarks}`,
        ref_no: data.ref_no
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const pay_qr_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                store_name: data.store_name,
                amount: data.amount,
                description: data.description
            };

            dbConnection.query("INSERT INTO gcash_pay_qr SET ?", pay_qr_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log(`[GCash] New Pay QR to ${pay_qr_data.store_name} successfully posted to database`)
                }
            });
        }
    });
}

export const insertGCashReceivedMoney = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", {
        gcash_id: data.gcash_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        current_gcash_balance: data.current_gcash_balance,
        amount: data.amount,
        remarks: `[Received Money] ${data.remarks}`,
        ref_no: data.ref_no
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const received_money_data = {
                gcash_transact_id: results.insertId,
                date_time: data.date_time,
                mobile_number: data.mobile_number,
                money_sender: data.money_sender,
                amount: data.amount,
                description: data.remarks
            };

            dbConnection.query("INSERT INTO gcash_received_money SET ?", received_money_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[GCash] New Received money successfully posted to database')
                }
            });
        }
    });
}
