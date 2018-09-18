//AUTHOR: Raghav Darisi
var config = {
    sessionSecret: "auth0isgr8!",
    domain: 'rdxonline.auth0.com',
    clientID: 'GxhuMfcddTRg7Tzb2nPwB3TB9muYOzwJ',
    clientSecret: 'ZQRMxlMyWYLtllWZIlv9tS2VkENQbD0jYuCVc-xfoaLvVYhdDOpLLd5T_P6svzcH',
    callbackURL: '/callback',
    scopes: ['profile', 'email', 'openid', 'offline_access'],
    audience: 'http://localhost:8080/api/v1/items',
    port: 3000,
    apiItems: 'http://localhost:8080/api/v1/items'
}

module.exports = config;