var unirest = require('unirest');
var config = require('./config');
var api = {};

api.getItems = function(access_token, successCB, errorCB) {
    unirest.get(config.apiItems)
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
    unirest.delete(config.apiItems + '/' + id)
    .headers({'Authorization': 'Bearer ' + access_token})
    .send()
    .end(function(response) {
        if(response.code == 200) {
            successCB();
        }
        else {
            errorCB(response.body);
        }
    })
}

api.postItem = function(json,access_token, successCB, errorCB) {
    unirest.post(config.apiItems + '/')
    .headers(
        {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        })
    .send(json)
    .end(function(response) {
        if(response.code == 200) {
            successCB(response.body);
        }
        else {
            errorCB(response.body);
        }

    });
}
module.exports = api;