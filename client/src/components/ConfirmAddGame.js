import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ConfirmAddGame extends Component {
  componentDidMount() {
    this.props.fetchOneGame(this.props.match.params.id);
  }
  render() {
    const gameId = this.props.match.params.id;
    const { selectedGame } = this.props;
    return (
      <div className='confirm-add-game'>
        <h1>Confirm Add Game</h1>
        <div className='confirm-add-game-container'>
          <p>
            You have added this game! You can find more details{' '}
            <a href={`/game/${gameId}`}>here</a>
          </p>
          <p>
            {' '}
            Date: {selectedGame.startDate}
            <br />
            Time: {selectedGame.startTime}
            <br />
            Arena: {selectedGame.arena}
            <br />
            Address: {selectedGame.address}
            <br />
          </p>
          <p>
            You will receive an email with details shortly. Have a fun and safe
            time with Shinny Squad.{' '}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectedGame: state.fetchOneGame };
};

export default connect(
  mapStateToProps,
  actions
)(ConfirmAddGame);
