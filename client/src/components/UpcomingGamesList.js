import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Modal from 'react-responsive-modal';
import LoginForm from './LoginForm';

class UpcomingGamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      gameId: '',
      userId: '',
      openGame: false
    };
  }
  componentDidMount() {
    this.props.fetchGames();
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onOpenGameModal = () => {
    this.setState({ openGame: true });
  };

  onCloseGameModal = () => {
    this.setState({ openGame: false });
  };

  handleSelectOneGame = game => event => {
    event.preventDefault();
    const gameId = event.target.value;
    const userId = this.props.auth._id;

    this.props.fetchOneGame(gameId);

    if (!this.props.auth) {
      this.onOpenModal();
    } else {
      this.onOpenGameModal();
    }
  };

  handleOnSubmitBookGame = event => {
    const userId = this.props.auth._id;
    const gameId = this.props.selectedGame._id;

    const gameUserId = {
      userId: userId,
      gameId: gameId
    };

    console.log('gameid', gameId);

    if (!this.props.auth.games.includes(gameId)) {
      console.log('is this working?');
      this.props.addGameUserRequest(gameUserId);
      alert('You have successfully registered for this game');
      window.location.reload();
    } else {
      alert('You have already registered for this game');
    }
  };

  render() {
    const sortGames = (a, b) => {
      if (a.startDate < b.startDate) {
        return -1;
      } else if (a.startDate > b.startDate) {
        return 1;
      }
      return 0;
    };
    const games = this.props.games.sort(sortGames);
    const { open } = this.state;
    const { openGame } = this.state;
    const selectedGame = this.props.selectedGame;

    return (
      <div className='upcoming-games'>
        <h2>Upcoming Games</h2>
        <div className='games'>
          {games.map(game => {
            if (new Date() < new Date(game.startDate)) {
              return (
                <div className='game-container' key={game._id}>
                  <img
                    className='game-picture'
                    src='/images/american-player.jpg'
                    alt='player'
                  />
                  <div className='game-details-container'>
                    <p className='game-details'>
                      Date: {game.startDate} <br />
                      GameID: {game._id} <br />
                      <br />
                      Arena: {game.arena} <br />
                      Address: {game.address} <br />
                      Start Time: {game.startTime} <br />
                      End Time: {game.endTime} <br />
                      Available Spots: {game.slots} <br />
                      Skill: {game.skill} <br />
                      Players:
                      <br />
                      <br />
                    </p>
                    <div>
                      {this.props.auth &&
                      this.props.auth.games.includes(game._id) ? (
                        <div key={game._id}>
                          already registered
                          <br />
                          <a href={`/games/${game._id}`}>
                            <button
                              className='delete-game-button'
                              onClick={this.handleSelectOneGame(game)}
                              value={game._id}
                            >
                              Quit Game
                            </button>
                          </a>
                        </div>
                      ) : (
                        <a href={`/games/${game._id}`}>
                          <button
                            onClick={this.handleSelectOneGame(game)}
                            className='book-game-button'
                            value={game._id}
                          >
                            Book Game
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          })}
          {/* Login Modal  */}
          <Modal open={open} onClose={this.onCloseModal} center>
            <LoginForm />
          </Modal>
          {/* Game details Modal */}
          <Modal open={openGame} onClose={this.onCloseGameModal} center>
            <div>
              <h1>Game Details</h1>
              Instructions: Bring gear, go to the game and bring a puck. <br />
              <p>
                Arena: {selectedGame.arena} <br />
                Address: {selectedGame.address} <br />
                date: {selectedGame.date} <br />
                Start Time: {selectedGame.startTime} <br />
                End Time: {selectedGame.endTime} <br />
                Available Spots: {selectedGame.slots} <br />
                Skill: {selectedGame.skill} <br />
              </p>
              {this.props.auth &&
              !this.props.auth.games.includes(selectedGame._id) ? (
                <button
                  className='book-game-button'
                  onClick={this.handleOnSubmitBookGame}
                >
                  Book Game
                </button>
              ) : (
                <button className='delete-game-button'>Quit Game</button>
              )}
            </div>
          </Modal>
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
)(UpcomingGamesList);
