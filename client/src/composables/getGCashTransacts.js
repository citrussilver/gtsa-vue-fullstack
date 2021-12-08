import { ref } from 'vue'
import config from '../config'

export let gCashTransacts = ref([])
export let filterRemarksGCashTransacts = ref([])

export const getGCashTransacts = async () => {

    await fetch(`${config.apiUrl}/gc/tr`, {
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

export const getFilterRemarksGCashTransacts = async (param) => {
    gCashTransacts.value = [];
    await fetch(`${config.apiUrl}/gc/tr/:${param}`, {
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