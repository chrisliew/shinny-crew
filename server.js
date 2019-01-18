const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

const passportSetup = require('./config/passport-setup-google');

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

// Use Routes
require('./routes/api/auth-routes')(app);

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
  console.log(`Server listening it up on port ${PORT}`);
});
