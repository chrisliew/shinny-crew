const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const Game = require('../../models/Game');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    console.log('auth', req.body.auth);
    const price = req.body.selectedGame.price * 100;
    const startDate = req.body.selectedGame.startDate;
    const startTime = req.body.selectedGame.startTime;
    const email = req.body.auth.email;
    const firstName = req.body.auth.firstName;
    const lastName = req.body.auth.lastName;

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

    console.log('Stripe Position', req.body.position);

    if (req.body.position === 'forward') {
      Game.findByIdAndUpdate(
        req.body.selectedGame._id,
        { $inc: { forwardSlots: -1 } },
        function(err, model) {
          console.log(err);
        }
      );
    } else if (req.body.position === 'defense') {
      Game.findByIdAndUpdate(
        req.body.selectedGame._id,
        { $inc: { defenseSlots: -1 } },
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
  });
};
