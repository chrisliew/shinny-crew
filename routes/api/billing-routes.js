const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const Game = require('../../models/Game');

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 1800,
      currency: 'cad',
      description: 'For this hockey game @',
      source: req.body.token.id
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
