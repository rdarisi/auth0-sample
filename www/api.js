var unirest = require('unirest');

var api = {};

api.getItems = function(access_token, successCB, errorCB) {
    unirest.get('http://localhost:8080/api/v1/items')
    .headers({'Authorization': 'Bearer ' + access_token})
    .send()
    .end(function(response) {
        if(response.code == 200) {
            successCB(response.body);
        }
        else {
            errorCB(response.body);
        }

    });
}

api.deleteItem = function(id, access_token, successCB, errorCB) {
    unirest.delete('http://localhost:8080/api/v1/items/' + id)
    .headers({'Authorization': 'Bearer ' + access_token})
    .send()
    .end(function(response) {
        if(response.code == 200) {
            successCB('OK');
        }
        else {
            errorCB();
        }
    })
}


module.exports = api;