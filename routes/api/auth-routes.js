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
      if (!existingUser) {
        return res.json({ email: 'Email does not exist' });
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
        firstName: req.body.username,
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
};
