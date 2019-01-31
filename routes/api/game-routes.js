// Routes for games
const express = require('express');
const moment = require('moment-timezone');
const Game = require('../../models/Game');

// GET /api/games *  Returns list of all upcoming games * PUBLIC

// GET /api/games *  Returns list of games for current user. * PRIVATE

// PUT(or post and delete?) /api/games *  Allows current user to add or delete self from games * PRIVATE

// POST /api/games *  Allows Admin to add games.  * ADMIN

module.exports = app => {
  app.post('/api/games/', (req, res) => {
    const newGame = new Game({
      arena: req.body.arena,
      address: '123 fake street',
      startDate: moment(req.body.startDate)
        .tz('America/Los_Angeles')
        .format('DD-MM-YYYY'),
      endDate: moment(req.body.endDate)
        .tz('America/Los_Angeles')
        .format('DD-MM-YYYY'),
      startTime: moment(req.body.startTime)
        .tz('America/Los_Angeles')
        .format('LT'),
      endTime: moment(req.body.endTime)
        .tz('America/Los_Angeles')
        .format('LT'),
      slots: req.body.slots,
      skill: req.body.skill,
      players: ['']
    });
    newGame.save().then(Game => res.json(Game));
  });
};
// DELETE /api/games * Allows Admin to delete games.  * ADMIN
