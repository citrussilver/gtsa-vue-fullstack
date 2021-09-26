import { ref } from 'vue'
import config from '../config'

export let sa1Transacts = ref([])
export let sa2Transacts = ref([])

export const getSa1Transacts = async () => {

    await fetch(`${config.apiUrl}/sa1/tr`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        return res.json()
    })
    .then(data => {
        sa1Transacts.value = [...data]
    })
    .catch(error => console.log(error))
}

export const getSa2Transacts = async () => {

    await fetch(`${config.apiUrl}/sa2/tr`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        return res.json()
    })
    .then(data => {
        sa1Transacts.value = [...data]
    })
    .catch(error => console.log(error))
}