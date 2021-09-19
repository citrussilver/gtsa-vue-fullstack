import { ref } from 'vue'
import config from '../config'

export let gCashTransacts = ref([])

export const getGCashTransacts = async () => {

    await fetch(`${config.apiUrl}/gc/transacts`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        return res.json()
    })
    .then(data => {
        gCashTransacts.value = [...data]
    })
    .catch(error => console.log(error))
}