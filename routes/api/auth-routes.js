// Normal Login
const mongoose = require('mongoose');
const keys = require('../../config/keys');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');

module.exports = app => {
  // Login Route
  // POST /api/login
  // PUBLIC
  app.post('/api/login', (req, res) => {
    const { password, email } = req.body;

    (async login => {
      const existingUser = await User.findOne({ email: email });
      console.log('existinguser', existingUser);
      if (!existingUser) {
        return res.status(400).json({ email: "Email doesn't exist" });
      }
      const comparePassword = await bcrypt.compare(
        password,
        existingUser.password,
        (err, response) => {
          if (response) {
            res.cookie('userProfile', {
              firstName: existingUser.username,
              email: email,
              _id: existingUser._id
            });
            // res.send('');
            res.json({ username: existingUser.username, email: email });
            // res.redirect('/');
            return;
            // return console.log('req', res.cookie);
            // Sets cookie session and userdata back to person
          } else if (!response) {
            return res.json({ loginFailed: 'loginFailed' });
          }
        }
      );
    })();
  });

  app.post('/api/register', (req, res) => {
    if (req.body.password.length < 8) {
      return;
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.json({ email: 'Email already exists' });
      }
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
  // app.post('/api/current_user_normal', (req, res) => {
  // Find user based on parameter passed in here
  // send back stuff here
  // res.send({ email: 'dude@dude.com', username: '2pac' });
  // });
};
