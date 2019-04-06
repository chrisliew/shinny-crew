import React, { Component } from 'react';
import UpcomingGamesList from './UpcomingGamesList';
import HowItWorks from './HowItWorks';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class Home extends Component {
  handleOnClickViewGames = () => {
    document
      .getElementById('upcoming-games')
      .scrollIntoView({ block: 'start', behavior: 'smooth' });
  };
  render() {
    return (
      <div className='home'>
        <div className='home-welcome'>
          <div className='box business-description'>
            <div>A Easy Way To Join A </div>
            <div>Drop In Hockey Game In Vancouver</div>
            <div className='goalies-free'>Goalies Play For Free</div>
            <br />
            <div>
              <Button
                onClick={this.handleOnClickViewGames}
                size='lg'
                color='success'
              >
                Join Games
              </Button>
            </div>
          </div>
        </div>
        <HowItWorks />
        <UpcomingGamesList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Home);
