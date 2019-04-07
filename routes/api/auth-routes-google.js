const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.cookie('userProfile', 'usercookie');
      res.redirect('/landing');
    }
  );

  app.get('/api/logout', function(req, res) {
    if (req.session) {
      req.session = null;
      res.clearCookie('userProfile');
      res.redirect('/');
    }
  });

  app.post('/api/current_user', (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else if (req.cookies) {
      res.send(req.cookies.userProfile);
    }
  });
};
