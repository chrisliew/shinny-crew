import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
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
    console.log('auth', this.props.auth);
    return (
      <div className='navbar'>
        <div className='navbar-left child'>
          <h3>Shinny Crew</h3>
          <div>
            <a href='/api/current_user'>Current User</a>
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
