const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('./keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // this is not the same as profile id.
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for the google strat
      callbackURL: '/auth/google/callback',
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile ID
        done(null, existingUser);
      } else {
        // we don't have a user record with this ID, make a new record
        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value
        }).save();
        done(null, user);
      }
    }
  )
);
