import { ref } from 'vue'
import config from '../config'

export let savingsAccs = ref([])

export const getSavingsAccs = async () => {

    await fetch(`${config.apiUrl}/sa/get-sa-accounts`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        return res.json()
    })
    .then(data => {
        savingsAccs.value = [...data]
    })
    .catch(error => console.log(error))
}

