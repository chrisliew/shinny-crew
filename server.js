const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Game');
const passportSetup = require('./config/passport-setup-google');
const passportFacebookSetup = require('./config/passport-setup-facebook');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);

app.get('*', (req, res) => {
  res.redirect('https://' + req.headers.host + req.url);
});

app.use(function(req, res, next) {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
  next();
});

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const db = keys.mongoURL;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Use Routes
require('./routes/api/auth-routes-google')(app);
require('./routes/api/auth-routes-facebook')(app);
require('./routes/api/auth-routes')(app);
require('./routes/api/game-routes')(app);
require('./routes/api/billing-routes')(app);
require('./routes/api/user-routes')(app);
require('./routes/api/email-routes')(app);

// Code for production env

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// app.all('/*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
