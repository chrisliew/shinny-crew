const nodemailer = require('nodemailer');
const keys = require('../../config/keys');
const sgMail = require('@sendgrid/mail');

module.exports = app => {
  app.post('/api/email/confirm', (req, res) => {
    console.log('email route', req.body);
    sgMail.setApiKey(keys.sendGridKey);
    const msg = {
      to: req.body.email,
      from: 'game@ShinnySquad.com',
      subject: `Shinny Squad Game Confirmation: ${req.body.startDate} `,
      html: `
        <h1>Game Confirmation</h1>
        <p>
          Hello ${req.body.name},
        <br/>
        Thanks for registering for this game on <b>${
          req.body.startDate
        }</b> @ <b>${req.body.startTime}</b> at ${
        req.body.arena
      }</b> located at <b>${
        req.body.address
      }.</b>    You will be playing the <b>${
        req.body.position
      }</b> position. For more details, please click here: <a href='https://shinnysquad.com/game/${
        req.body.gameId
      }'>Details</a>
        </p>

      `
    };
    sgMail.send(msg);
  });

  app.post('/api/email/refund', (req, res) => {
    console.log('email refund route', req.body);
    sgMail.setApiKey(keys.sendGridKey);
    const msg = {
      to: req.body.email,
      from: 'refund@ShinnySquad.com',
      subject: `Shinny Squad Game refund: ${req.body.startDate} `,
      html: `
        <h1>Game refund</h1>
        <p>
          Hello ${req.body.name},
        <br/>
        You have quit this game and gotten a refund. For more details, please click here: <a href='https://shinnysquad.com/game/${
          req.body.gameId
        }'>Details</a>
        </p>

      `
    };
    sgMail.send(msg);
  });

  app.post('/api/email/contact', (req, res) => {
    console.log('contact route', req.body);
    sgMail.setApiKey(keys.sendGridKey);
    const msg = {
      to: 'chriswvliew@gmail.com',
      from: 'contact-form@ShinnySquad.com',
      subject: `Contact Info Form Filled Out `,
      html: `
        <h1>Contact Info</h1>
        <p>
        Name: ${req.body.name} <br/>
        Email: ${req.body.email} <br/>
        Phone: ${req.body.phone} <br/>
        Message: ${req.body.message} <br/>
        </p>

      `
    };
    sgMail.send(msg);
  });
};
