import React, { Component } from 'react';
import LoginForm from './LoginForm';
import UpcomingGamesList from './UpcomingGamesList';
import { connect } from 'react-redux';

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
            Join a Drop In Shinny In Vancouver
            <br />
            <button
              className='welcome-button'
              onClick={this.handleOnClickViewGames}
            >
              View Games Now
            </button>
          </div>
          <div className='box'>
            <LoginForm />
          </div>
        </div>
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
