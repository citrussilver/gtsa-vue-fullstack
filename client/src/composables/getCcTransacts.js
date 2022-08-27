import config from '../config'

export const getCcTransacts = async () => {

    let response = await fetch(`${config.apiUrl}/cc/get-cc-transacts`, {
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