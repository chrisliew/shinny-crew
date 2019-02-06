import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
  loggedInStatus = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href='/auth/google'>Login</a>;
      default:
        return (
          <div className='navbar-logged-in'>
            <div>
              <a href='/games'>Your Games</a>
            </div>
            <div>Logged in as {this.props.auth.displayName} </div>
            <div>
              <a href='/api/logout'>Logout</a>
            </div>
          </div>
        );
    }
  };
  render() {
    return (
      <div className='navbar'>
        <div className='navbar-left child'>
          {this.props.auth ? (
            <a href='/landing'>
              {' '}
              <h3>Shinny Crew</h3>
            </a>
          ) : (
            <a href='/'>Shinny Crew</a>
          )}
          <div>
            {/* <a href='/api/current_user'>Current User</a> */}
            <a href='/games/new'>Add Game</a>
          </div>
        </div>
        <div className='child'>{this.loggedInStatus()}</div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Navbar);
