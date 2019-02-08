import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: []
    };
  }

  componentDidMount() {
    axios.get('/api/games/' + this.props.match.params.id).then(res => {
      this.setState({
        game: res.data
      });
    });
  }

  handleDeleteGame = () => {
    this.props.deleteUserFromGame(this.props.auth._id);
  };

  render() {
    console.log('game', this.state.game);
    const { game } = this.state;

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
          <button onClick={this.handleDeleteGame}>Delete Game</button>
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
