import { ref } from 'vue'
import config from '../config'

export const getCustomers = async () => {

    let response = await fetch(`${config.apiUrl}/gcash/get-gcash-customers`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        return res.json()
    })
    .then(data => {
        // customers.value = [...data]
        return data
    })
    .catch(error => console.log(error))

    return response
}