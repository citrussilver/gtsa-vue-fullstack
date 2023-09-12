import config from '../config'

export const getDeliveryLocations = async () => {
    
    let response = await fetch(`${config.apiUrl}/misc/get-delivery-loc`, {
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