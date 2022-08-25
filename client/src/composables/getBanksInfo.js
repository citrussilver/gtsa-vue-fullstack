import { ref } from 'vue'
import config from '../config'

export const getSavingsAccs = async () => {

    let response = await fetch(`${config.apiUrl}/sa/get-sa-accounts`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        return res.json()
    })
    .then(data => {
        // savingsAccs.value = [...data]
        return data
    })
    .catch(error => err)

    return response
}

