// Routes for games
const express = require('express');
const moment = require('moment-timezone');
const Game = require('../../models/Game');
const User = require('../../models/User');
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const db = keys.mongoURL;

// GET /api/games *  Returns list of games for current user. * PRIVATE

// POST (or post and delete?) /api/games *  Allows current user to add or delete self from games * PRIVATE

module.exports = app => {
  // GET /api/games *  Returns list of all upcoming games * PUBLIC
  app.get('/api/games/', (req, res) => {
    Game.find()
      .sort({ dateOrder: -1 })
      .then(games => res.json(games));
  });

  // GET /api/game/:id * Get Game by Id * PUBLIC
  app.get('/api/game/:id', (req, res) => {
    Game.findById(req.params.id).then(games => res.json(games));
  });

  // GET /api/games/:id * Get User Games by UserID * PRIVATE
  app.get('/api/games/:id', (req, res) => {
    if (req.session.passport.user === req.params.id) {
      Game.find()
        .elemMatch('players', { userID: req.params.id })
        .then(games => res.json(games));
    }
  });

  // POST /api/games *  Allows Admin to add games.  * ADMIN
  app.post('/api/games/', (req, res) => {
    // if (req.session.passport.user === '5c7b0b253f0801dc2228f66a') {
    const newGame = new Game({
      arena: req.body.arena,
      address: req.body.address,
      price: req.body.price,
      startDate: moment(req.body.startDate)
        .tz('America/Los_Angeles')
        .format('L'),
      endDate: moment(req.body.endDate)
        .tz('America/Los_Angeles')
        .format('L'),
      startTime: moment(req.body.startTime)
        .tz('America/Los_Angeles')
        .format('LT'),
      endTime: moment(req.body.endTime)
        .tz('America/Los_Angeles')
        .format('LT'),
      forwardSlots: req.body.forwardSlots,
      defenseSlots: req.body.defenseSlots,
      goalieSlots: req.body.goalieSlots,
      skill: req.body.skill,
      players: []
    });
    newGame.save().then(Game => res.json(Game));
    // } else {
    //   return;
    // }
  });

  // PUT /api/games/ * Adds user to game  * PRIVATE
  app.put('/api/games/', (req, res) => {
    Game.findByIdAndUpdate(
      req.body.gameId,
      {
        $push: {
          players: { userID: req.body.userId, position: req.body.position }
        }
      },
      { safe: true, upsert: true },
      function(err, model) {
        console.log(err);
      }
    );
    if (req.body.position === 'forward') {
      Game.findByIdAndUpdate(
        req.body.gameId,
        { $inc: { forwardSlots: -1 } },
        function(err, model) {
          console.log(err);
        }
      );
    } else if (req.body.position === 'defense') {
      Game.findByIdAndUpdate(
        req.body.gameId,
        { $inc: { defenseSlots: -1 } },
        function(err, model) {
          console.log(err);
        }
      );
    } else if (req.body.position === 'goalie') {
      Game.findByIdAndUpdate(
        req.body.gameId,
        { $inc: { goalieSlots: -1 } },
        function(err, model) {
          console.log(err);
        }
      );
    }
  });

  // DELETE /api/game * Delete User from Game and Add position back * PRIVATE
  app.delete('/api/game/', async (req, res) => {
    const positionUpdate = await (function update() {
      if (req.body.position === 'forward') {
        Game.findByIdAndUpdate(
          req.body.gameId,
          { $inc: { forwardSlots: +1 } },
          function(err, model) {
            console.log(err);
          }
        );
      } else if (req.body.position === 'defense') {
        Game.findByIdAndUpdate(
          req.body.gameId,
          { $inc: { defenseSlots: +1 } },
          function(err, model) {
            console.log(err);
          }
        );
      } else if (req.body.position === 'goalie') {
        Game.findByIdAndUpdate(
          req.body.gameId,
          { $inc: { goalieSlots: +1 } },
          function(err, model) {
            console.log(err);
          }
        );
      }
    })();

    const deleteGame = await Game.findByIdAndUpdate(req.body.gameId, {
      $pull: {
        players: { userID: req.body.userID }
      }
    });
    const refundGame = await stripe.refunds.create({
      charge: req.body.stripeChargeId
    });
  });
};
