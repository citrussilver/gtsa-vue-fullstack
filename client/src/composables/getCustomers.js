import { ref } from 'vue'
import config from '../config'

export let customers = ref([])

export const getCustomers = async () => {

    await fetch(`${config.apiUrl}/gc/gc-custs`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        return res.json()
    })
    .then(data => {
        customers.value = [...data]
        console.log(customers)
    })
    .catch(error => console.log(error))
}