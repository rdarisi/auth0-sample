//AUTHOR: Raghav Darisi

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//app.use(auth.jwtCheck("http://localhost:8080/api/v1/items"));
app.use(
    jwt({
        secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://rdxonline.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:8080/api/v1/items',
    issuer: "https://rdxonline.auth0.com/",
    algorithms: ['RS256']
    })
);

app.use('/api/v1', router);

app.listen(port);
console.log('Api server running on ' + port);
