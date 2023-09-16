import config from '../config'

export const getShopeeWalletInfo = async () => {
  
    let response = await fetch(`${config.apiUrl}/shp/get-shpw`, {
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