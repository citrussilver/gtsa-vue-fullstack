import config from '../config'

export const getSavingsAccs = async () => {

    let response = await fetch(`${config.apiUrl}/sa/get-sa-accounts`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => res.json())
    .then(data => data)
    .catch(error => err)

    return response;
}

