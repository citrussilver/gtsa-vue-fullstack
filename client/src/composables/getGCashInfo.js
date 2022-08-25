import { reactive, ref } from 'vue'
import config from '../config'

export const gCash1Bal = ref(0)

export const getGCashInfo = async () => {
  
  // `${config.apiUrl}/gcash/get-gcash-accounts`
    let response = await fetch(`${config.apiUrl}/gcash/get-gcash-accounts`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => {
      return res.json()
    })
    .then(data => {
      gCash1Bal.value = data[0].balance_wc
      return data
    })
    .catch(err => err)

    return response
}
