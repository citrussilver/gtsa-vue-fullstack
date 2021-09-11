import { ref } from 'vue'

export const gCashBalance = ref(0)
export const gCashBalanceNc = ref(0)

export const getGCashInfo = async () => {
  
  const response = await fetch('http://localhost:5000/gc/gc-info', {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => {
      return res.json()
    })
    .then(data => {
      gCashBalance.value = data[0].balance
      console.log(gCashBalance.value)
    })
    .catch(error => console.log(error))
}

export const getGCashBalNc = async () => {
  
  const response = await fetch('http://localhost:5000/gc/gc-bal-nc', {
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
      console.log(gCashBalance.value)
    })
    .catch(error => console.log(error))
}
