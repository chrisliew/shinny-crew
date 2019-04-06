import React, { Component } from 'react';
import UpcomingGamesList from './UpcomingGamesList';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class Landing extends Component {
  handleOnClickViewGames = () => {
    document
      .getElementById('upcoming-games')
      .scrollIntoView({ block: 'start', behavior: 'smooth' });
  };
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
