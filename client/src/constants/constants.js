export default {
    bank_component_id: 1,
    gcash_component_id: 2,
    maya_component_id: 3,
    cc_component_id: 4,
    lazada_component_id: 5,
    shopee_component_id: 6,
    bank_transacts: {
        deposit: { 
            id: 1,
            name: 'Cash Deposit',
            route: 'sa/save-sa-depo'
        },
        withdraw: { 
            id: 2,
            name: 'Cash Withdraw',
            route: 'sa/save-sa-wdraw'
        },
        bills_payment: { 
            id: 3,
            name: 'Bills Payment',
            route: 'sa/save-sa-billspay'
        },
        credit_card_payment: {
            id: 14,
            name: 'Credit Card Payment'
        },
        gcash_cash_in: {
            id: 4,
            name: 'GCash Cash-in',
            route: 'sa/save-gc-cash-in'
        },
        maya_cash_in: { 
            id: 11,
            name: 'Maya Cash-in',
            route: 'sa/save-maya-cash-in'
        },
        reload_prepaid_card: {
            id: 5,
            name: 'Reload Prepaid Card',
            route: 'sa/save-sa-prepaid-reload'
        },
        transfer_money: { 
            id: 6,
            name: 'Transfer Money',
            route: 'sa/save-sa-transfer-money'
        },
        store_payment: { 
            id: 12,
            name: 'Store payment',
            route: 'sa/save-sa-store-payment'
        },
        adjustment: { 
            id: 7,
            name: 'Adjustment',
            route: 'sa/save-sa-adjustment'
        },
        earn_interest: { 
            id: 8,
            name: 'Earn Interest',
            route: 'sa/save-sa-earn-interest'
        },
        tax_withheld: { 
            id: 9,
            name: 'Tax Witheld',
            route: 'sa/save-sa-taxwh'
        },
        salary_income: { 
            id: 10,
            name: 'Salary / Income',
            route: 'sa/save-sa-sale-income'
        },
        shopee_online_banking: {
            id: 13,
            name: 'Shopee - Online Banking',
            route: 'sa/save-shopee-online-banking'
        },
        bank_charge: {
            id: 15,
            name: 'Bank Charge'
        },
        shopee_pay_cash_in: {
            id: 16,
            name: 'ShopeePay Cash-in',
            route: 'sa/save-shopee-pay-cash-in'
        }
    },
    
    bank_billers: {
        bpi: {
            bluemaster_card: {
                id: 1,
                name: 'BPI - BEC MC'
            },
            aiaph: {
                id: 2,
                name: 'BPI - AIAPH'
            },
            col: {
                id: 3,
                name: 'BPI - COL'
            }
        },
        unionbank: {
            visa_platinum: {
                id: 4,
                name: 'UB - Visa Platinum'
            }
        }
    },
    national_billers: {
        prime: {
            id: 5,
            name: 'Primewater'
        },
        meralco: {
            id: 6,
            name: 'Meralco'
        },
        dasca: {
            id: 7,
            name: 'Dasca'
        },
        others: {
            id: 8,
            name: 'Others'
        }
    },
    gcash_transacts: {
        load_sale: {
            id: 1,
            name: 'Load Sale',
            route: 'gcash/save-loadsale'
            // route: 'maya/save-maya-cash-in'
        },
        bills_payment: {
            id: 3,
            name: 'Bills Payment',
            route: 'gcash/save-gc-billspay'
        },
        income_sale: {
            id: 4,
            name: 'Income / Sale',
            route: 'gcash/save-gc-income'
        },
        self_buy_load: {
            id: 5,
            name: 'Self Buy Load',
            route: 'gcash/save-selfbuyload'
        },
        bank_transfer: {
            id: 6,
            name: 'Bank Transfer',
            route: 'gcash/save-gc-banktransfer'
        },
        online_payment: {
            id: 7,
            name: 'Online Payment',
            route: 'gcash/save-ol-shop-pay'
        },
        adjustment: {
            id: 8,
            name: 'Adjustment',
            route: 'gcash/save-gc-adjustment'
        },
        send_money: {
            id: 9,
            name: 'Send Money',
            route: 'gcash/save-gc-sendmoney'
        },
        refund: {
            id: 10,
            name: 'Refund',
            route: 'gcash/save-gc-refund'
        },
        pay_qr: {
            id: 11,
            name: 'Pay QR',
            route: 'gcash/save-pay-qr'
        },
        receive_money: { 
            id: 12,
            name: 'Receive Money',
            route: 'gcash/save-received-money'
        }
    },
    cc_transacts: {
        online_payment: {
            id: 1,
            name: 'Online Payment',
            route: 'cc/save-cc-op'
        },
        non_online_payment: {
            id: 2,
            name: 'Non-Online Payment',
            route: 'cc/save-cc-nop'
        },
        loan_promo: {
            id: 3,
            name: 'Credit-to-Cash Loan',
            route: 'cc/save-cc-loan'
        },
        cc_refund: {
            id: 4,
            name: 'Refund',
            route: 'cc/save-cc-refund'
        },
        adjustment: {
            id: 5,
            name: 'Adjustment',
            route: 'cc/save-cc-adjustment'
            
        }
    },
    maya_transacts: {
        cash_in: {
            id: 3,
            name: 'Cash-In',
            route: 'maya/save-maya-cash-in'
        },
        online_payment: {
            id: 1,
            name: 'Online Payment',
            route: 'maya/save-ol-shop-pay'
        },
        qr_pay: {
            id: 2,
            name: 'QR Pay',
            route: 'maya/save-qr-pay'
        },
        self_buy_load: {
            id: 5,
            name: 'Self Buy Load',
            route: 'maya/save-maya-self-load'
        },
        bills_payment: {
            id: 4,
            name: 'Bills Payment',
            route: 'maya/save-bills-pay'
        },
        adjustment: {
            id: 8,
            name: 'Adjustment',
            route: 'maya/save-adjustment'
        },
        refund: {
            id: 10,
            name: 'Refund',
            route: 'maya/save-refund'
        }
    },
    lazada_transacts: {
        online_shopping: 1
    },
    shopee_transacts: {
        online_shopping: 1
    },
    adjustment_types: {
        credit: 71,
        debit: 72
    },
    online_stores: [
        { val: 1, name: 'Google Play'},
        { val: 2, name: 'Steam'},
        { val: 3, name: 'GOG'},
        { val: 4, name: 'Grab'},
        { val: 12, name: 'Grab Pay' },
        { val: 13, name: 'CodaShop' },
        { val: 5, name: 'Patreon'},
        { val: 6, name: 'Gumroad'},
        { val: 7, name: 'From Japan'},
        { val: 8, name: 'Shopee'},
        { val: 9, name: 'Lazada'},
        { val: 10, name: 'Others'},
        { val: 11, name: 'Food Panda' },        
        { val: 12, name: 'Angkas' }
    ],
    placeholders: {
        default_id: 0,
        transaction_type: '-- Select Transaction Type --',
        biller_merch: '-- Select Biller / Merchant --'
    },
    app_year: '2025 GCSA'
}