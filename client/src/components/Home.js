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
            Join a Drop In Hockey Game In Vancouver
            <br />
            <div>
              <Button
                onClick={this.handleOnClickViewGames}
                size='lg'
                color='success'
              >
                View Games Now
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
