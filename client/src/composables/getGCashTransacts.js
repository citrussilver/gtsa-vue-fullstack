import config from '../config'

export const getGCashTransacts = async () => {

    let response = await fetch(`${config.apiUrl}/gcash/get-gcash-transactions`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

    return response;
}

export const getFilterRemarksGCashTransacts = async (param) => {
    
    let response = await fetch(`${config.apiUrl}/gcash/get-gcash-transactions:${param}`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

    return response;
}