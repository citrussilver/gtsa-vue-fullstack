import config from '../config'

export const getCustomers = async () => {

    let response = await fetch(`${config.apiUrl}/gcash/get-gcash-customers`, {
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