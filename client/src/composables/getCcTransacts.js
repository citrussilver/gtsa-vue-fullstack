import { ref } from 'vue'
import config from '../config'

export let ccTransacts = ref([])

export const getCcTransacts = async () => {

    await fetch(`${config.apiUrl}/cc/tr`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        return res.json()
    })
    .then(data => {
        ccTransacts.value = [...data]
    })
    .catch(error => console.log(error))
}