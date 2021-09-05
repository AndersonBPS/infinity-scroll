const request = require('request');

const dataUrl = 'https://jsonplaceholder.typicode.com/photos';

function getPage(number, onSuccess, onFailure) {
    request(`${dataUrl}?albumId=${number}`, (error, response, body) => {
        if (error) {
            onFailure(error);
        } else if (response.statusCode === 200) {
            onSuccess(JSON.parse(body));
        } else {
            onFailure(`${response.statusCode}: ${response.statusMessage}`);
        }
    });
}

module.exports = getPage;