import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConfirmAddGame extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div className='confirm-add-game'>
        <h1>Confirm Add Game</h1>
        <div>
          You have added this game! Here are the details (Add details here) You
          will receive an email @ (enter email here).{' '}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  null
)(ConfirmAddGame);
