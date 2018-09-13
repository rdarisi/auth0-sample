var unirest = require('unirest');

var api = {};

api.getItems = function(access_token, cb) {
    unirest.get('http://localhost:8080/api/v1/items')
    .headers({'Authorization': 'Bearer ' + access_token})
    .send()
    .end(function(response) {
        cb(response.body);
    });
}


module.exports = api;