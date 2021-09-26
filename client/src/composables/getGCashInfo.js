import { ref } from 'vue'
import config from '../config'

export let gCashAccts = ref([])
export let gCash1Nick = ref('')
export let gCash1Bal = ref(0)
export let gCash1BalWc = ref(0)

export const getGCashInfo = async () => {
  
    await fetch(`${config.apiUrl}/gc/gc-accs`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
      gCashAccts.value = [...data]
      gCash1Nick.value = data[0].account_nick
      gCash1Bal.value = data[0].balance
      gCash1BalWc.value = data[0].balance_wc

    })
    .catch(error => console.log(error))
}
