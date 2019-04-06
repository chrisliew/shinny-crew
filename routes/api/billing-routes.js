const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const Game = require('../../models/Game');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    console.log('req.body api/stripe', req.body);
    console.log('req.session api/stripe', req.session);
    console.log('req.cookies api/stripe', req.cookies);

    const price = req.body.selectedGame.price * 100;
    const startDate = req.body.selectedGame.startDate;
    const startTime = req.body.selectedGame.startTime;
    const email = req.body.auth.email;
    const firstName = req.body.auth.firstName;
    const lastName = req.body.auth.lastName;
    const authId = req.body.auth._id;

    if (
      (req.session.passport && req.session.passport.user === authId) ||
      (req.cookies.userProfile && req.cookies.userProfile._id === authId)
    ) {
      const charge = await stripe.charges.create({
        amount: price,
        currency: 'cad',
        description: `For this hockey game on ${startDate} @ ${startTime}`,
        source: req.body.token.id,
        receipt_email: email
      });
      const updateCharge = await Game.findByIdAndUpdate(
        req.body.selectedGame._id,
        {
          $push: {
            players: {
              userID: req.body.auth._id,
              stripeChargeId: charge.id,
              position: req.body.position,
              firstName: firstName,
              lastName: lastName
            }
          }
        }
      );

      if (req.body.position === 'forward') {
        Game.findByIdAndUpdate(
          req.body.selectedGame._id,
          { $inc: { forwardSlots: -1 } },
          function(err, model) {
            console.log(err);
          }
        );
      } else if (req.body.position === 'defenseman') {
        Game.findByIdAndUpdate(
          req.body.selectedGame._id,
          { $inc: { defensemanSlots: -1 } },
          function(err, model) {
            console.log(err);
          }
        );
      } else if (req.body.position === 'goalie') {
        Game.findByIdAndUpdate(
          req.body.selectedGame._id,
          { $inc: { goalieSlots: -1 } },
          function(err, model) {
            console.log(err);
          }
        );
      }
    }
  });
};
