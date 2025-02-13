
import { watch } from 'vue'

export const applyWatchOnRef = (composableVar, target) => {
  watch(composableVar, data => {
    console.log('>>applyWatchOnRef()');
    // console.log(data);
    target.value = data
    console.log(target.value);
  })
}

export const invokerInitializer = async (composableCallback) => {
  let response = []
  response = await composableCallback()
    .then(res => res)

  // console.log(response)

  return response;
}

export const executeHash = () => {
  let length = 16;
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

// factory sample

// const makeSavingsAcctObj = (name, balance) => {
//   let savingsAcct = reactive({
//     name: '',
//     balance: 1
//   });
//   savingsAcct.name = name;
//   savingsAcct.balance = balance;
//   return savingsAcct;
// }