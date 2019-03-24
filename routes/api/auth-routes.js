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
        return res.status(400).json({ email: "Email doesn't exist" });
      }
      console.log('existinguser', existingUser);
      const comparePassword = await bcrypt.compare(
        password,
        existingUser.password,
        (err, response) => {
          if (response) {
            res.cookie('username', existingUser.username);
            // res.send('');
            res.json({ username: existingUser.username });
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
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
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
};
