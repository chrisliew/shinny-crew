const express = require('express');
const User = require('../../models/User');
const keys = require('../../config/keys');
const db = keys.mongoURL;
const mongoose = require('mongoose');

// POST or PUT /api/user/:id

// PUT /api/email/:userId * Allows user to change their email * PRIVATE
module.exports = app => {
  app.put('/api/email/', (req, res) => {
    User.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          email: req.body.email
        }
      },
      { safe: true, upsert: true },
      function(err, model) {
        console.log(err);
      }
    );
  });
};
