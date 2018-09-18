var express = require('express');
var app = new express();

var bodyParser = require('body-parser');
var session = require('express-session');
var api = require('./api');
var config = require('./config');
var Auth0Strategy = require('passport-auth0');
var passport = require('passport');

var port = process.env.PORT || config.port;

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: config.sessionSecret
}));
var strategy = new Auth0Strategy(
    {
        domain: config.domain,
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        scope: config.scopes
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
  passport.authenticate('auth0', {'audience': config.audience}), function (req, res) {
  res.redirect("/");
});

app.get('/', function(req, res) {
    if(req.user) {
        console.log(req.user);
        api.getItems(req.user.accessToken, function(data) {
            console.log(req.user);
            res.render('index', {'items': data, 'user': req.user} );
        }, function(data) {
            res.send(500);
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
        res.status(202).json({"code": 202, "message": "item deleted!"});
    }, function(error) {
        res.status(error.code).json(error);
    })
})

app.post("/api/v1/items/", function(req,res) {
    console.log(req.body);
    api.postItem(req.body, req.user.accessToken, function() {
        res.status(201).json({"code": 201, "message": "item created!"});
    }, function(error) {
        res.status(error.code).json(error);
    });
});
app.listen(port);
console.log('Api server running on ' + port);