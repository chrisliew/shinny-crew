import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [],
      player: []
    };
  }

  componentDidMount() {
    this.props.fetchOneGame(this.props.match.params.id);
    console.log('game', this.props.selectedGame.players);
  }

  handleDeleteGame = userInfo => event => {
    event.preventDefault();
    console.log('userinfo', userInfo);
    const playerInfo = userInfo.filter(
      player => player.userID === this.props.auth._id
    );
    playerInfo[0]['gameId'] = this.props.selectedGame._id;

    this.props.deleteUserFromGame(playerInfo[0]);
  };

  render() {
    const game = this.props.selectedGame;

    return (
      <div className='game'>
        <h1>Game</h1>
        <div className='game-details'>
          <ul>
            <li>{game.startDate}</li>
            <li>{game.arena}</li>
            <li>{game.address}</li>
            <li>{game.startTime}</li>
            <li>{game.endTime}</li>
            <li>{game.skill}</li>
          </ul>
          <button onClick={this.handleDeleteGame(game.players)}>
            Delete Game
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    games: state.fetchGames,
    auth: state.auth,
    selectedGame: state.fetchOneGame
  };
};

export default connect(
  mapStateToProps,
  actions
)(Game);
