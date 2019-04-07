import React, { Component } from 'react';
import UpcomingGamesList from './UpcomingGamesList';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className='landing'>
          <div className='box business-description'>
            <div>Upcoming Games</div>
            <br />
          </div>
        </div>
        <UpcomingGamesList id='landing-upcoming-games' />
      </div>
    );
  }
}

export default Landing;
