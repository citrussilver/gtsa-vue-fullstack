import { getDeliveryLocations } from '../models/deliveryLocationModel.js'

export const showDeliveryLocations  = (req, res) => {
    getDeliveryLocations((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}