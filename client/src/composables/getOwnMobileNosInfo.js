import config from '../config'

export const getOwnMobileNos = async () => {
    
    let response = await fetch(`${config.apiUrl}/misc/get-own-mobile-nos`, {
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