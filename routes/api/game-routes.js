// Routes for games
const express = require('express');
const moment = require('moment-timezone');
const Game = require('../../models/Game');
const User = require('../../models/User');
const keys = require('../../config/keys');

// GET /api/games *  Returns list of games for current user. * PRIVATE

// POST (or post and delete?) /api/games *  Allows current user to add or delete self from games * PRIVATE

module.exports = app => {
  // GET /api/games *  Returns list of all upcoming games * PUBLIC
  app.get('/api/games/', (req, res) => {
    Game.find()
      .sort({ dateOrder: -1 })
      .then(games => res.json(games));
  });

  // GET /api/games/:id * Get Game by Id * PUBLIC
  app.get('/api/games/:id', (req, res) => {
    Game.findById(req.params.id).then(games => res.json(games));
  });

  // POST /api/games *  Allows Admin to add games.  * ADMIN
  app.post('/api/games/', (req, res) => {
    const newGame = new Game({
      arena: req.body.arena,
      address: '123 fake street',
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
      slots: req.body.slots,
      skill: req.body.skill,
      players: []
    });
    newGame.save().then(Game => res.json(Game));
  });

  // PUT /api/games/ * Adds user to game, and game to user.  * PRIVATE
  app.put('/api/games/', (req, res) => {
    console.log('req-body', req.body);

    Game.findByIdAndUpdate(
      req.body.gameId,
      { $push: { players: req.body.userId } },
      { safe: true, upsert: true },
      function(err, model) {
        console.log(err);
      }
    );
  });

  // DELETE /api/game * Delete User from Game and Game from User by Id * PRIVATE
  app.delete('/api/game/', (req, res) => {
    Game.findByIdAndUpdate(
      req.body.gameId,
      { $pull: { players: req.body.userId } },
      { safe: true, upsert: true },
      function(err, model) {
        console.log(err);
      }
    );
  });

  // DELETE /api/games/:id * Delete Game by Id * ADMIN
};
