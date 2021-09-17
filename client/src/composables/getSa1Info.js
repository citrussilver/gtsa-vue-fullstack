import axios from 'axios'
import { ref } from 'vue'
import config from '../config' 

export const bankName = ref('')
export const sa1Balance = ref(0)
export const sa1BalanceNc = ref(0)

export const getSa1Info = async () => {
  
    await fetch(`${config.apiUrl}/sa/sa1-info`, {
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
      sa1Balance.value = data[0].balance
      bankName.value = data[0].bank_name
    })
    .catch(error => console.log(error))

    // await axios.get(`${config.apiUrl}/sa/sa1-info`)
    //   .then(response => {
    //     sa1Balance.value = response.data[0].balance
    //     bankName.value = response.data[0].bank_name
    //   })
    //   .catch(error => console.log(error))
}

export const getSa1BalNc = async () => {
  
    await fetch(`${config.apiUrl}/sa/sa1-bal-nc`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => {
      return res.json()
    })
    .then(data => {
      sa1BalanceNc.value = data[0].balance
    })
    .catch(error => console.log(error))
}
