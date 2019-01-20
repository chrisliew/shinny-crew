const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// Strategy config
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // existingUser is from the User
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, profile);
        } else {
          new User({
            googleId: profile.id,
            displayName: profile.displayName
          })
            .save()
            .then(done(null, profile));
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  // this is not the same as profile id.
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
