import React, { Component } from 'react';

class HowItWorks extends Component {
  render() {
    return (
      <div className='how-it-works'>
        <h1>How It Works</h1>
        <div>
          <div className='container'>
            <div className='item'>
              <img src='/images/puck.png' alt='item-icon' />
              <div>
                Find a game at your skill level and choose your position{' '}
              </div>
            </div>
            <div className='item'>
              <img src='/images/debit-card.png' alt='item-icon' />
              <div>Pay online. No more fumbling with cash at the game.</div>
            </div>
            <div className='item'>
              <img src='/images/hockey-sticks.png' alt='item-icon' />
              <div>Show up with your gear and ready to play!</div>
            </div>
          </div>
        </div>
        <a href='/landing'>
          <button className='book-game-button'>View Upcoming Games</button>
        </a>
      </div>
    );
  }
}

export default HowItWorks;
