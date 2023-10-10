import dbConnection from '../config/database.js';

export const getAllCcs = (result) => {
    dbConnection.query('SELECT credit_card_id, last_4_digits, cc_name, avail_credit_limit, FORMAT(avail_credit_limit, 2) AS avail_credit_limit_wc FROM credit_cards', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const getCcTransacts = (result) => {
    dbConnection.query('SELECT cc_transact_id, date_time AS date_time_og, DATE_FORMAT(date_time,"%a, %b %d, %Y  %H:%i") AS date_time, cctt.description as transact_type, cctr.description, FORMAT(amount,2) AS amount, remarks FROM credit_card_transactions cctr JOIN credit_card_transaction_type cctt ON cctr.transact_type_id = cctt.id WHERE credit_card_id = 1 ORDER BY date_time_og DESC LIMIT 30', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const insertCcOnlinePay = (data, result) => {
    dbConnection.query("INSERT INTO credit_card_transactions SET ?", {
        credit_card_id: data.credit_card_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        description: data.description,
        current_credit_limit: data.current_credit_limit,
        amount: data.amount,
        remarks: `[Online Payment - ${data.online_shop_website}] ${data.remarks}`
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const online_pay_data = {
                cc_transact_id: results.insertId,
                credit_card_id: data.credit_card_id,
                date_time: data.date_time,
                amount: data.amount,
                online_shop_website: data.online_shop_website,
                remarks: data.remarks,
            }

            dbConnection.query("INSERT INTO credit_card_online_payments SET ?", online_pay_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log(`[Credit Card] ${online_pay_data.online_shop_website} transaction successfully posted to database`)
                }
            });
        }
    });
}

export const insertCcNonOnlinePay = (data, result) => {
    dbConnection.query("INSERT INTO credit_card_transactions SET ?", {
        credit_card_id: data.credit_card_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        description: data.description,
        amount: data.amount,
        remarks: `[Store Payment - ${data.store_name}] ${data.remarks}`,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const non_online_pay_data = {
                cc_transact_id: results.insertId,
                credit_card_id: data.credit_card_id,
                date_time: data.date_time,
                amount: data.amount,
                store_name: data.store_name,
                remarks: data.remarks,
            }

            dbConnection.query("INSERT INTO credit_card_non_online_payments SET ?", non_online_pay_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log(`[Credit Card] Payment to ${non_online_pay_data.store_name} successfully posted to database`)
                }
            });
        }
    });
}

export const insertCcPromoLoan = (data, result) => {
    dbConnection.query("INSERT INTO credit_card_transactions SET ?", {
        credit_card_id: data.credit_card_id,
        date_time: data.date_time,
        transact_type_id: data.transact_type_id,
        description: data.description,
        amount: data.amount,
        remarks: `[Loan (Promo)] ${data.remarks}`,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const promo_loan_data = {
                cc_transact_id: results.insertId,
                credit_card_id: data.credit_card_id,
                date_time: data.date_time,
                loan_thru: data.loan_thru,
                loan_transact_no: data.loan_transact_no,
                loan_agent_name: data.loan_agent_name,
                description: data.description,
                amount: data.amount,
                term: data.term,
                term_pay: data.term_pay,
                remarks: data.remarks,
            }

            dbConnection.query("INSERT INTO credit_card_loan SET ?", promo_loan_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Credit Card] New Loan (Promo) successfully posted to database')
                }
            });
        }
    });
}