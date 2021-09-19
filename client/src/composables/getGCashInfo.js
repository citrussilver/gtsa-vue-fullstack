import { ref } from 'vue'
import config from '../config' 

export const gCashNickname = ref('')
export const gCashBalance = ref(0)
export const gCashBalanceNc = ref(0)

export const getGCashInfo = async () => {
  
    await fetch(`${config.apiUrl}/gc/gc-info`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => {
      return res.json()
    })
    .then(data => {
      gCashNickname.value = data[0].account_nickname
      gCashBalance.value = data[0].balance
    })
    .catch(error => console.log(error))
}

export const getGCashBalNc = async () => {
  
    await fetch(`${config.apiUrl}/gc/gc-bal-nc`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => {
      return res.json()
    })
    .then(data => {
      gCashBalanceNc.value = data[0].balance
    })
    .catch(error => console.log(error))
}
