const nodemailer = require('nodemailer');
const keys = require('../../config/keys');
const sgMail = require('@sendgrid/mail');

module.exports = app => {
  app.post('/api/email/confirm', (req, res) => {
    sgMail.setApiKey(keys.sendGridKey);
    const msg = {
      to: req.body.email,
      from: 'Game@ShinnySquad.com',
      subject: `Shinny Squad Game Confirmation: ${req.body.startDate} `,
      html: `
        <h1>Game Confirmation</h1>
        <p>
          Hello ${req.body.name},
          <br/><br/>
        Thanks for registering for this game on <b>${
          req.body.startDate
        }</b> @ <b>${req.body.startTime}</b> at ${
        req.body.arena
      }</b> located at <b>${
        req.body.address
      }.</b>    You will be playing the <b>${
        req.body.position
      }</b> position. For more details, please click here: <a href='https://www.shinnysquad.com/game/${
        req.body.gameId
      }'>Details</a>
      <br/>
      <br/>
      Please bring a dark and light jersey and equipment to the game. 
      <br/>
      <br/>
      ShinnySquad.com
        </p>

      `
    };
    sgMail.send(msg);
  });

  app.post('/api/email/refund', (req, res) => {
    sgMail.setApiKey(keys.sendGridKey);
    const msg = {
      to: req.body.email,
      from: 'Refund@ShinnySquad.com',
      subject: `Shinny Squad Game refund: ${req.body.startDate} `,
      html: `
        <h1>Game Refund</h1>
        <p>
          Hello ${req.body.name},
          <br/>
          <br/>
        Your game has been successfully cancelled on <b>${
          req.body.startDate
        }</b> @ <b>${req.body.startTime}</b> at ${
        req.body.arena
      }</b> located at <b>${
        req.body.address
      }.</b> For more details, please click here: <a href='https://www.shinnysquad.com/game/${
        req.body.gameId
      }'>Details</a>
      <br />
      <br />
      ShinnySquad.com
        </p>

      `
    };
    sgMail.send(msg);
  });

  app.post('/api/email/contact', (req, res) => {
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
