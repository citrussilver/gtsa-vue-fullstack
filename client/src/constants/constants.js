export default {
    bank_component_id: 1,
    gcash_component_id: 2,
    maya_component_id: 3,
    cc_component_id: 4,
    lazada_component_id: 5,
    shopee_component_id: 6,
    bank_transacts: {
        deposit: 1,
        withdraw: 2,
        bills_payment: 3,
        credit_card_payment: 14,
        gcash_cash_in: 4,
        maya_cash_in: 11,
        reload_prepaid_card: 5,
        transfer_money: 6,
        store_payment: 12,
        adjustment: 7,
        earn_interest: 8,
        tax_withheld: 9,
        salary_income: 10,
        shopee_online_banking: 13,
        bank_charge: 15,
        shopee_pay_cash_in: 16
    },
    
    bank_billers: {
        bpi: {
            bluemaster_card: 'BPI - BEC MC',
            aiaph: 'BPI - AIAPH',
            col: 'BPI - COL'
        },
        unionbank: {
            visa_platinum: 'UB - Visa Platinum'
        }
    },
    national_billers: {
        prime: 'Primewater',
        meralco: 'Meralco',
        dasca: 'Dasca',
        others: 'Others'
    },
    gcash_transacts: {
        load_sale: 1,
        bills_payment: 3,
        income_sale: 4,
        self_buy_load: 5,
        bank_transfer: 6,
        online_payment: 7,
        adjustment: 8,
        send_money: 9,
        refund: 10,
        pay_qr: 11,
        receive_money: 12
    },
    cc_transacts: {
        online_payment: 1,
        non_online_payment: 2,
        loan_promo: 3,
        cc_refund: 4
    },
    maya_transacts: {
        cash_in: 3,
        online_payment: 1,
        qr_pay: 2,
        self_buy_load: 5,
        bills_payment: 4,
        adjustment: 8,
        refund: 10
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
    ]
 }