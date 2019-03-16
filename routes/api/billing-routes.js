const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const Game = require('../../models/Game');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

// { token:
//   { id: 'tok_1EEUtwAwinH749wff8CN6CSf',
//     object: 'token',
//     card:
//      { id: 'card_1EEUtwAwinH749wfrNzUtq4v',
//        object: 'card',
//        address_city: null,
//        address_country: null,
//        address_line1: null,
//        address_line1_check: null,
//        address_line2: null,
//        address_state: null,
//        address_zip: null,
//        address_zip_check: null,
//        brand: 'Visa',
//        country: 'US',
//        cvc_check: 'pass',
//        dynamic_last4: null,
//        exp_month: 11,
//        exp_year: 2022,
//        funding: 'credit',
//        last4: '4242',
//        metadata: {},
//        name: 'service@shinnysquad.com',
//        tokenization_method: null },
//     client_ip: '50.64.104.126',
//     created: 1552713464,
//     email: 'service@shinnysquad.com',
//     livemode: false,
//     type: 'card',
//     used: false },
//  selectedGame:
//   { players: [ [Object] ],
//     _id: '5c7cb6ac7319c214438aa7d6',
//     arena: 'Trout Lake Rink',
//     address: '3360 Victoria Dr, Vancouver, BC',
//     price: 18,
//     startDate: '03/30/2019',
//     endDate: '03/30/2019',
//     startTime: '9:24 PM',
//     endTime: '9:24 PM',
//     forwardSlots: 18,
//     defenseSlots: 7,
//     goalieSlots: 2,
//     skill: 'Beginner',
//     __v: 0 },
//  auth:
//   { games: [],
//     _id: '5c7b0b253f0801dc2228f66a',
//     googleId: '116805417193712015830',
//     displayName: 'Christopher Liew',
//     email: 'chriswvliew@gmail.com',
//     __v: 0 },
//  position: 'forward' }

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    console.log('reqbody', req.body);
    console.log('selectedGame', req.body.selectedGame);
    const price = req.body.selectedGame.price * 100;
    const startDate = req.body.selectedGame.startDate;
    const startTime = req.body.selectedGame.startTime;
    const email = req.body.auth.email;

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
            position: req.body.position
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
