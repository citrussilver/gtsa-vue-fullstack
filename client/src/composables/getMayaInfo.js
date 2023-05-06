import config from '../config'

export const getMayaInfo = async () => {
  
    let response = await fetch(`${config.apiUrl}/maya/get-maya-accounts`, {
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
