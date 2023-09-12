import dbConnection from '../config/database.js';

export const insertLazadaOrder = (data, result) => {
    // console.log(data);

    dbConnection.query("INSERT INTO lazada_transactions SET ?", {
        payment_method: data.payment_method,
        date_time: data.date_time,
        delivery_location: data.delivery_location,
        order_no: data.order_no,
        description: data.description,
        store_name: data.store_name,
        merch_subtotal: data.merch_subtotal,
        shipping_fee: data.shipping_fee,
        shipping_fee_discount: data.shipping_fee_discount,
        store_discount: data.store_discount,
        coins: data.coins,
        instant_discount: data.instant_discount,
        cashback: data.cashback,
        sub_total: data.sub_total,
    }, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {

            if(data.payment_method == 2) {
                // fill up gcash_transactions data
                const gcash_data = {
                    gcash_id: 1,
                    date_time: data.date_time,
                    transact_type_id: 7,
                    current_gcash_balance: data.current_gcash_balance,
                    amount: data.sub_total,
                    remarks: `[Online Payment - Lazada] ${data.description}`
                };

                dbConnection.query("INSERT INTO gcash_transactions SET ?", gcash_data, (err, results) => {
                    if(err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, results);
                        console.log(`[Lazada] New Lazada order successfully posted to database.\n[GCash] Payment to Lazada successfully posted to database`)
                    }
                });
            }
        }
    });
}