//AUTHOR: Raghav Darisi
var config = {
    apiPort: 8080,
    jwksUri: "https://rdxonline.auth0.com/.well-known/jwks.json",
    jwksRequestsPerMinute: 5,
    jwtIssuer: "https://rdxonline.auth0.com/",
    jwtAlgos : ['RS256'],
    jwtAudience: "http://localhost:8080/api/v1/items"
}

module.exports = config;