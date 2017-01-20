// app.js
var express  = require('express');
var auth = require('./routes/auth.js')
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var app = express();

app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'mysecret'}));
app.use(passport.initialize());
app.use(passport.session());

// app.js
passport.use(new GithubStrategy({
  clientID: '',
  clientSecret: '',
  callbackURL: 'http://localhost:3000/auth/callback'
}, function(accessToken, refreshToken, profile, done){
  done(null, {
    accessToken: accessToken,
    profile: profile
  });
}));


// app.js
passport.serializeUser(function(user, done) {
  // for the time being tou can serialize the user
  // object {accessToken: accessToken, profile: profile }
  // In the real app you might be storing on the id like user.profile.id
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // If you are storing the whole user on session we can just pass to the done method,
  // But if you are storing the user id you need to query your db and get the user
  //object and pass to done()
  done(null, user);
});
// app.js
app.get('/auth', passport.authenticate('github'));
app.get('/auth/error', auth.error);
app.get('/auth/callback',
  passport.authenticate('github', {failureRedirect: '/auth/error'}),
  auth.callback
);
var server = app.listen(port);
var server = http.createServer(app);
