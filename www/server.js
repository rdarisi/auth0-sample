var express = require('express');
var app = new express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var session = require('express-session');
var api = require('./api');

var Auth0Strategy = require('passport-auth0');
var passport = require('passport');


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'auth0isgr8!' 
}));
var strategy = new Auth0Strategy(
    {
        domain: 'rdxonline.auth0.com',
        clientID: 'GxhuMfcddTRg7Tzb2nPwB3TB9muYOzwJ',
        clientSecret: 'ZQRMxlMyWYLtllWZIlv9tS2VkENQbD0jYuCVc-xfoaLvVYhdDOpLLd5T_P6svzcH',
        callbackURL: '/callback',
        scope: ['profile', 'email', 'openid', 'offline_access']
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken
        return done(null, profile);
      }
);
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(strategy);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  function(req, res) {
      if (!req.user) {
          throw new Error('user null');
        }
        res.redirect("/");
    }
);

app.get('/login',
  passport.authenticate('auth0', {'audience': 'http://localhost:8080/api/v1/items'}), function (req, res) {
  res.redirect("/");
});

app.get('/', function(req, res) {
    if(req.user) {
        console.log(req.user.refreshToken);
        api.getItems(req.user.accessToken, function(data) {
            res.render('index', {'items': data} );
        })
    }
    else {
        res.redirect('/login')
    }
});

app.get('/error', function(req, res) {
    res.render('error', {} );
})


app.delete("/api/v1/items/:id", function(req, res) {
    console.log(req.params.id);
    api.deleteItem(req.params.id, req.user.accessToken, function(data) {
        res.send(200);   
    })
})

app.listen(port);
console.log('Api server running on ' + port);