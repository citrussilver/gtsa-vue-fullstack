import dbConnection from '../config/database.js';

// Get All Savings Acc Transactions
export const getSa1Transacts = (result) => {
    // DESC LIMIT 30
    dbConnection.query('SELECT sa_transact_id, date_time AS date_time_og, DATE_FORMAT(date_time,"%a, %b %d, %Y  %H:%i") AS date_time, bt.description as transact_type, FORMAT(amount,2) AS amount, FORMAT(current_balance,2) AS current_balance, remarks, FORMAT(post_transact_balance,2) AS post_transact_balance, location FROM savings_acct_transactions sa JOIN bank_transaction_type bt ON sa.bank_transact_type_id = bt.id WHERE bank_id = 1 ORDER BY date_time_og DESC LIMIT 50', (err, results) => {
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
        remarks: `[Cash Deposit] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
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
        remarks: `[Cash Withdraw] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
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
// export const insertSavingsAcctTransaction = (data, result) => {
//     dbConnection.query("INSERT INTO savings_acct_transactions SET ?", data, (err, results) => {
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });
// }


// Insert Bank Bills Payment
export const insertBankBillsPayment = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: `[Bills Payment] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const billspay_data = {
                sa_transact_id: results.insertId,
                date_time: data.date_time,
                biller_merchant: data.biller_merchant,
                remarks: data.remarks,
                amount: data.amount
            }

            dbConnection.query("INSERT INTO bank_bills_payment SET ?", billspay_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log(`[Savings Acct] New Bills Payment to ${billspay_data.biller_merchant} successfully posted to database`)
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
        remarks: `[GCash Cash-in] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
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
                ref_no: data.gcash_ref_no,
                remarks: `[GCash Cash-in from Savings Account] ${data.remarks}`,
            };

            dbConnection.query("INSERT INTO gcash_transactions SET ?", cash_in_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const gcash_in_data = {
                        gcash_transact_id: results.insertId,
                        sa_transact_id: saTransactId,
                        remarks: `[Savings Account] ${data.remarks}`,
                        amount: data.amount
                    }
                    dbConnection.query("INSERT INTO gcash_cash_in SET ?", gcash_in_data, (err, results) => {
                        if(err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            result(null, results);
                            console.log('[Savings Acct] New GCash cash-in from bank successfully posted to database')
                        }
                    });
                }
            });
        }
    });
}

export const insertSaMayaCashIn = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: `[Maya Cash-in] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            let saTransactId = results.insertId;

            const cash_in_data = {
                maya_id: 1,
                date_time: data.date_time,
                transact_type_id: 0, // Maya Cash-in for now
                current_maya_balance: data.current_maya_balance,
                amount: data.amount,
                reference_id: data.reference_id,
                remarks: `[Maya Cash-in from Savings Account] ${data.remarks}`,
            };

            dbConnection.query("INSERT INTO maya_transactions SET ?", cash_in_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const maya_cash_in_data = {
                        maya_transact_id: results.insertId,
                        sa_transact_id: saTransactId,
                        remarks: `[Savings Account] ${data.remarks}`,
                        amount: data.amount
                    }
                    dbConnection.query("INSERT INTO maya_cash_in SET ?", maya_cash_in_data, (err, results) => {
                        if(err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            result(null, results);
                            console.log('[Savings Acct] New Maya cash-in from bank successfully posted to database')
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
        remarks: `[Prepaid Reload] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
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
        remarks: `[Transfer Money] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
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

export const insertStorePayment = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: `[Store Payment] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            const store_payment_data = {
                sa_transact_id: results.insertId,
                date_time: data.date_time,
                store_name: data.store_name,
                remarks: data.remarks,
                amount: data.amount
            }

            dbConnection.query("INSERT INTO bank_store_payment SET ?", store_payment_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log(`[Savings Acct] New Store Payment to ${store_payment_data.biller_merchant} successfully posted to database`)
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
        remarks: `[Adjustment] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
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
                    console.log(`[Savings Acct] New Adjustment ${adjustment_data.credit == 1 ? "(Credit)" : "(Debit)"} successfully posted to database`)
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
        remarks: `[Earn Interest] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
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
        remarks: `[Tax Witheld] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
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
        remarks: `[Salary / Income] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
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

export const insertShopeeOLBanking = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: `[Shopee - Online Banking] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const sa_shopee_ol_banking_data = {
                sa_transact_id: results.insertId,
                date_time: data.date_time,
                description: data.remarks,
                seller_name: data.seller_name,
                merch_subtotal: data.merch_subtotal,
                fee: data.fee,
                shipping_fee: data.shipping_fee,
                shipping_discount: data.shipping_discount,
                voucher_discount: data.voucher_discount,
                sub_total: data.sub_total
            };

            dbConnection.query("INSERT INTO bank_shopee_online_banking SET ?", sa_shopee_ol_banking_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] New Shopee - Online Banking successfully posted to database')
                }
            })
        }

    })
}

export const insertShopeePayCashIn = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: `[ShopeePay Cash-in] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const sa_shopee_pay_cash_in_data = {
                sa_transact_id: results.insertId,
                date_time: data.date_time,
                remarks: data.remarks,
                reference_number: data.reference_number,
                order_sn: data.order_sn,
                amount: data.amount
            };

            dbConnection.query("INSERT INTO bank_shopee_pay_cash_in SET ?", sa_shopee_pay_cash_in_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                    console.log('[Savings Acct] New ShopeePay Cash-in successfully posted to database')
                }
            });
        }
    });
}

export const insertSaPayCC = (data, result) => {
    dbConnection.query("INSERT INTO savings_acct_transactions SET ?", {
        bank_id: data.bank_id,
        date_time: data.date_time,
        bank_transact_type_id: data.bank_transact_type_id,
        amount: data.amount,
        current_balance: data.current_balance,
        remarks: `[Pay Credit Card] ${data.remarks}`,
        location: data.location,
        reference_number: data.reference_number
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const cc_bills_pay_data = {
                sa_transact_id: results.insertId,
                date_time: data.date_time,
                biller_merchant: data.biller_merchant,
                remarks: data.remarks,
                amount: data.amount
            }

            dbConnection.query("INSERT INTO bank_pay_credit_cards SET ?", cc_bills_pay_data, (err, results) => {
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {

                    dbConnection.query("UPDATE credit_cards SET avail_credit_limit = ? WHERE credit_card_id = ?", [data.new_credit_limit, data.credit_card_id], (err, results) => {
                        if(err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            result(null, results);
                            console.log(`[Savings Acct] New Pay Credit Card to ${cc_bills_pay_data.biller_merchant} successfully posted to database`)
                        }
                    });
                }
            });
        }
    });
}