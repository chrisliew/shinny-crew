const nodemailer = require('nodemailer');
const keys = require('../../config/keys');
const sgMail = require('@sendgrid/mail');

module.exports = app => {
  app.post('/api/email/confirm', (req, res) => {
    console.log('email route', req.body);
    sgMail.setApiKey(keys.sendGridKey);
    const msg = {
      to: req.body.email,
      from: 'do-not-reply@ShinnySquad.com',
      subject: `Shinny Squad Game Confirmation: ${req.body.startDate} `,
      html: `
        <h1>Game Confirmation</h1>
        <p>
          Hello ${req.body.name},
        <br/>
        Thanks for registering for this game on ${req.body.startDate} @ ${
        req.body.startTime
      } at ${req.body.arena} located at ${
        req.body.address
      }.  For more details, please click here: <a href=${req.body.gameId}></a>
        </p>

      `
    };
    sgMail.send(msg);
  });
};
