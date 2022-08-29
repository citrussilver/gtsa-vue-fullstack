import axios from 'axios'
import { toast } from 'bulma-toast'

export const invokerInitializer = async (composableCallback) => {
  let response = []
  response = await composableCallback()
    .then(res => res)

  // console.log(response)

  return response;
}

export const handleAxios = async (route, objData, type, specific) => {

  const res = await confirm(`Are you sure to save this ${specific} entry?`);

  if (res) {

    // console.log('YES')
    
    await axios.post(`${route}`, objData)
    .then(response => {

      toast({
        message: `[${type}] New ${specific} successfully posted to database`,
        duration: 3000,
        type: 'is-warning',
        position: "top-center",
        dismissible: true,
        pauseOnHover: true,
        closeOnClick: true
      })
    })
    .catch(err => {
      console.log(err);
    })


  } else {
    console.log('NO');
  }

  return res;
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