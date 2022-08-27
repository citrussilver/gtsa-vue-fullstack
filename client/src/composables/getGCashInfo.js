import config from '../config'

export const getGCashInfo = async () => {
  
    let response = await fetch(`${config.apiUrl}/gcash/get-gcash-accounts`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => res.json())
    .then(data => data)
    .catch(err => err)

    return response;
}
