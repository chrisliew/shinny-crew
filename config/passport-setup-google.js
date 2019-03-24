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
      console.log('existingusergoogle', existingUser);
      if (existingUser) {
        // we already have a record with the given profile ID
        done(null, existingUser);
      }

      const existingEmail = await User.findOne({
        email: profile.emails[0].value
      });

      if (existingEmail) {
        const user = await User.update(
          { email: existingEmail.email },
          {
            $set: { googleId: profile.id }
          },
          err => {
            console.log(err);
          }
        );
      } else if (!existingUser && !existingEmail) {
        // we don't have a user record with this ID, make a new record
        const user = await new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          photo: profile.photos[0].value,
          email: profile.emails[0].value
        }).save();
        done(null, user);
      }
    }
  )
);
