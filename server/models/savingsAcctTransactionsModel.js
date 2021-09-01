import dbConnection from '../config/database.js';

// Get All Savings Acc Transactions
export const getSavingsAcctTransactions = (result) => {
    dbConnection.query('SELECT DATE_FORMAT(date_time,"%a, %b %d, %Y  %H:%i") AS date_time, bt.description as transact_type, FORMAT(amount,2) AS amount, FORMAT(current_balance,2) AS current_balance, remarks, FORMAT(post_transact_balance,2) AS post_transact_balance, location FROM savings_acct_transactions sa JOIN bank_transaction_type bt ON sa.bank_transact_type_id = bt.id ORDER BY sa_transact_id DESC LIMIT 5', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

// Insert Bank Cash Deposit
export const insertBankCashDeposit = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", data, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const deposit_data = {
                sa_transact_id: results.insertId,
                remarks: data.remarks,
                amount: data.amount
            }




            result(null, results);
        }
    });
}

// Insert Bank Cash Withdraw
export const insertBankCashWithdraw = (data, result) => {
    dbConnection.query("INSERT INTO bank_cash_withdraws SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert Savings Acct Transaction
export const insertSavingsAcctTransaction = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}


// Insert Bank Bills Payment
export const insertBankBillsPayment = (data, result) => {
    dbConnection.query("INSERT INTO bank_bills_payment SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const insertGCashTransaction = (data, result) => {
    dbConnection.query("INSERT INTO gcash_transactions SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const insertGCashCashIn = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            let saTransactId = results.insertId;

            const cash_in_data = {
                date_time: dateTime,
                transaction_type_id: Number(2),
                amount: amount,
                remarks: remarks,
            };

            dbConnection.query("INSERT INTO gcash_transactions SET ?", cash_in_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const gcash_in_data = {
                        gcash_transact_id: results.insertId,
                        sa_transact_id: saTransactId,
                        remarks: remarks,
                        amount: amount
                    }
                    dbConnection.query("INSERT INTO gcash_cash_in SET ?", gcash_in_data, (err, results) => {
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
    });
}

export const insertBankPrepaidReload = (data, result) => {
    dbConnection.query("INSERT INTO bank_prepaid_reload SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}