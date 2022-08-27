import config from '../config'

export const getSa1Transacts = async () => {

    let response = await fetch(`${config.apiUrl}/sa/get-sa1-transactions`, {
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

export const getSa2Transacts = async () => {

    let response = await fetch(`${config.apiUrl}/sa/get-sa2-transactions`, {
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