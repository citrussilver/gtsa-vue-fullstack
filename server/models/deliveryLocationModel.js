import dbConnection from '../config/database.js';

export const getDeliveryLocations = (result) => {
    dbConnection.query('SELECT * FROM delivery_locations', (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}