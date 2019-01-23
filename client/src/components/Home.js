import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  loggedInStatus = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href='/auth/google'>Login with Google</a>;
      default:
        return (
          <div>
            Logged in as {this.props.auth.displayName}{' '}
            <a href='/api/logout'>Logout</a>
          </div>
        );
    }
  };

  render() {
    return (
      <div className='home'>
        <h1>Shinny Crew</h1>
        <span>{this.loggedInStatus()}</span>

        <a href='/api/current_user'>Current User</a>
        <a href='/auth/facebook'>Login with Facebook</a>
        <div>{}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Home);
