import React, { Component } from 'react';

class HowItWorks extends Component {
  render() {
    return (
      <div className='how-it-works'>
        <h1>How It Works</h1>
        <div>
          <p className='description'>
            1. Sign into your account using Facebook or Google <br />
            <br />
            2. Select a game at your skill level that you want to join <br />
            <br />
            3. Pay with a credit card to book the game. <br />
            <br />
            4. Show up at the time and arena shown with your gear and ready to
            play!
          </p>
        </div>
        <a href='/landing'>
          <button className='book-game-button'>View Upcoming Games</button>
        </a>
      </div>
    );
  }
}

export default HowItWorks;
