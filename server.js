const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

const app = express();

// cookieSession config
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile); // passes the profile data to serializeUser
    }
  )
);

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send('You must login!');
  }
}

// Routes

// passport.authenticate middleware is used here to authenticate the request
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
    prompt: 'select_account'
    // Used to specify the required data
  })
);

// The middleware receives the data from Google and runs the function on Strategy config
app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/secret');
  }
);

// Secret route
app.get('/secret', isUserAuthenticated, (req, res) => {
  res.send('You have reached the secret route');
});

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

// Logout route
app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const path = require('path');
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));
// Anything that doesn't match the above, send back index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

// Choose the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sever listening it up on port ${PORT}`);
});
