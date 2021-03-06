import dbConnection from '../config/database.js';

// Get All Savings Acc Transactions
export const getSa1Transacts = (result) => {
    dbConnection.query('SELECT sa_transact_id, date_time AS date_time_og, DATE_FORMAT(date_time,"%a, %b %d, %Y  %H:%i") AS date_time, bt.description as transact_type, FORMAT(amount,2) AS amount, FORMAT(current_balance,2) AS current_balance, remarks, FORMAT(post_transact_balance,2) AS post_transact_balance, location FROM savings_acct_transactions sa JOIN bank_transaction_type bt ON sa.bank_transact_type_id = bt.id WHERE bank_id = 1 ORDER BY date_time_og DESC LIMIT 30', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const getSa2Transacts = (result) => {
    dbConnection.query('SELECT sa_transact_id, date_time AS date_time_og, DATE_FORMAT(date_time,"%a, %b %d, %Y  %H:%i") AS date_time, bt.description as transact_type, FORMAT(amount,2) AS amount, FORMAT(current_balance,2) AS current_balance, remarks, FORMAT(post_transact_balance,2) AS post_transact_balance, location FROM savings_acct_transactions sa JOIN bank_transaction_type bt ON sa.bank_transact_type_id = bt.id WHERE bank_id = 2 ORDER BY date_time_og DESC LIMIT 30', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const getAllSavingsAccs = (result) => {
    dbConnection.query('SELECT bank_id, bank_name, bank_abbrev, balance, FORMAT(balance, 2) AS balance_wc FROM banks', (err, results) => {
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
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: data.remarks,
        location: data.location,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const deposit_data = {
                sa_transact_id: results.insertId,
                remarks: data.remarks,
                amount: data.amount
            }

            dbConnection.query("INSERT INTO bank_cash_deposit SET ?", deposit_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] New Cash Deposit successfully posted to database')
                }
            });
        }
    });
}

// Insert Bank Cash Withdraw
export const insertBankCashWithdraw = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: data.remarks,
        location: data.location,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const wdraw_data = {
                sa_transact_id: results.insertId,
                remarks: data.remarks,
                amount: data.amount
            }

            dbConnection.query("INSERT INTO bank_cash_withdraws SET ?", wdraw_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] New Cash Withdraw successfully posted to database')
                }
            });
        }
    });
}

// Insert Savings Acct Transaction
export const insertSavingsAcctTransaction = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", data, (err, results) => {
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
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: data.remarks,
        location: data.location,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const billspay_data = {
                sa_transact_id: results.insertId,
                remarks: data.remarks,
                amount: data.amount
            }

            dbConnection.query("INSERT INTO bank_bills_payment SET ?", billspay_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] New Bills Payment successfully posted to database')
                }
            });
        }
    });
}

export const insertGCashCashIn = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: data.remarks,
        location: data.location,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            let saTransactId = results.insertId;

            const cash_in_data = {
                gcash_id: 1,
                date_time: data.date_time,
                transact_type_id: 2,
                current_gcash_balance: data.current_gcash_balance,
                amount: data.amount,
                remarks: data.remarks,
            };

            dbConnection.query("INSERT INTO gcash_transactions SET ?", cash_in_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const gcash_in_data = {
                        gcash_transact_id: results.insertId,
                        sa_transact_id: saTransactId,
                        remarks: data.remarks,
                        amount: data.amount
                    }
                    dbConnection.query("INSERT INTO gcash_cash_in SET ?", gcash_in_data, (err, results) => {
                        if(err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            result(null, results);
                            console.log('[Savings Acct] New GCash cash-in successfully posted to database')
                        }
                    });
                }
            });
        }
    });
}

export const insertBankPrepaidReload = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: data.remarks,
        location: data.location,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const reload_prepaid_card_data = {
                sa_transact_id: results.insertId,
                date_time: data.date_time,
                prepaid_card_id: 3,
                amount: data.amount,
            }

            dbConnection.query("INSERT INTO bank_prepaid_reload SET ?", reload_prepaid_card_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] Reload Prepaid Card successfully posted to database')
                }
            });
        }
    });
}

export const insertTransferMoney = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: data.remarks,
        location: data.location,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const transfer_money_data = {
                sa_transact_id: results.insertId,
                bank_id: data.bank_id,
                date_time: data.date_time,
                receipient_acct_no: data.receipient_acct_no,
                remarks: data.remarks,
                amount: data.amount
            }

            dbConnection.query("INSERT INTO bank_transfer_money SET ?", transfer_money_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] New Transfer Money successfully posted to database')
                }
            });
        }
    });
}

export const insertAdjustment = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: data.remarks,
        location: data.location,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const adjustment_data = {
                sa_transact_id: results.insertId,
                bank_id: data.bank_id,
                date_time: data.date_time,
                credit: data.credit,
                amount: data.amount,
                remarks: data.remarks,
            }

            dbConnection.query("INSERT INTO bank_adjustment SET ?", adjustment_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] New Adjustment successfully posted to database')
                }
            });
        }
    });
}

export const insertEarnInterest = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: data.remarks,
        location: data.location,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const earn_interest_data = {
                sa_transact_id: results.insertId,
                bank_id: data.bank_id,
                date_time: data.date_time,
                amount: data.amount,
                remarks: data.remarks,
            }

            dbConnection.query("INSERT INTO bank_earn_interest SET ?", earn_interest_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] New Earn Interest successfully posted to database')
                }
            });
        }
    });
}

export const insertTaxWithheld = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: data.remarks,
        location: data.location,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const tax_withheld_data = {
                sa_transact_id: results.insertId,
                bank_id: data.bank_id,
                date_time: data.date_time,
                amount: data.amount,
                remarks: data.remarks,
            }

            dbConnection.query("INSERT INTO bank_tax_withheld SET ?", tax_withheld_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] New Tax Withheld successfully posted to database')
                }
            });
        }
    });
}

export const insertSalaryIncome = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: data.remarks,
        location: data.location,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const sa_income_data = {
                sa_transact_id: results.insertId,
                date_time: data.date_time,
                amount: data.amount,
                description: data.remarks
            };

            dbConnection.query("INSERT INTO bank_income SET ?", sa_income_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] New Salary / Income successfully posted to database')
                }
            })
        }
    })
}