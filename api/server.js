//AUTHOR: Raghav Darisi
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router');
var config = require('./config');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || config.apiPort;

app.use(
    jwt({
        secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: config.jwksRequestsPerMinute,
        jwksUri: config.jwksUri
    }),
    audience: config.jwtAudience, //should be veriable
    issuer: config.issuer,
    algorithms: config.jwtAlgos
    })
);

app.use('/api/v1', router);

app.listen(port);
console.log('Api server running on ' + config.apiPort);
