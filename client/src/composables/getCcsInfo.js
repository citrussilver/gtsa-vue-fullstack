import { ref } from 'vue'
import config from '../config'

export let creditCards = ref([])
export let cc1Alias = ref('')
export let cc1AvailCreditLimit = ref(0)

export const getCreditCards = async () => {

    await fetch(`${config.apiUrl}/cc/cc-accs`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        return res.json()
    })
    .then(data => {
        creditCards.value = [...data]
    })
    .catch(error => console.log(error))
}