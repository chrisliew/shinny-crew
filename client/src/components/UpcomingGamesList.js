import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Modal from 'react-responsive-modal';
import LoginForm from './LoginForm';
import ReactTable from 'react-table';

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

    if (!this.props.auth.games.includes(gameId)) {
      this.props.addGameUserRequest(gameUserId);
      alert('You have successfully registered for this game');
      window.location.reload();
    } else {
      alert('You have already registered for this game');
    }
  };

  handleOnDeleteGame = event => {
    const userId = this.props.auth._id;
    const gameId = this.props.selectedGame._id;

    const gameUserId = {
      userId: userId,
      gameId: gameId
    };

    console.log('game-user-id', gameUserId);

    this.props.deleteUserFromGame(gameUserId);
    window.location.reload();
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
                    src='/images/game-day-icon.png'
                    alt='player'
                  />
                  <div className='game-details-container'>
                    <div className='game-details-table'>
                      <table>
                        <tr>
                          <td>Date:</td>
                          <td>{game.startDate}</td>
                        </tr>
                        <tr>
                          <td>Arena:</td>
                          <td>{game.arena}</td>
                        </tr>
                      </table>
                    </div>
                    <p className='game-details'>
                      Date: {game.startDate} <br />
                      <br />
                      Arena: {game.arena} <br />
                      Address: {game.address} <br />
                      Start Time: {game.startTime} <br />
                      End Time: {game.endTime} <br />
                      Available Forward Spots: {game.forwardSlots} <br />
                      Available Defense Spots: {game.defenseSlots} <br />
                      Available Goalie Spots: {game.goalieSlots} <br />
                      Skill: {game.skill} <br />
                      <br />
                      <br />
                    </p>
                    <div>
                      {this.props.auth &&
                      game.players.includes(this.props.auth._id) ? (
                        <div key={game._id}>
                          already registered
                          <br />
                          <a href={`/game/${game._id}`}>
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
                  <Modal open={openGame} onClose={this.onCloseGameModal} center>
                    <div>
                      <h1>Game Details</h1>
                      Instructions: Bring gear, go to the game and bring a puck.{' '}
                      <br />
                      <p>
                        Arena: {selectedGame.arena} <br />
                        Address: {selectedGame.address} <br />
                        date: {selectedGame.startDate} <br />
                        Start Time: {selectedGame.startTime} <br />
                        End Time: {selectedGame.endTime} <br />
                        Available Forward Spots: {
                          selectedGame.forwardSlots
                        }{' '}
                        <br />
                        Available Defense Spots: {
                          selectedGame.defenseSlots
                        }{' '}
                        <br />
                        Available Goalie Spots: {selectedGame.goalieSlots}{' '}
                        <br />
                        Skill: {selectedGame.skill} <br />
                      </p>
                      <div>
                        Choose Your Position:
                        <div>
                          <input
                            className='position-radio-button'
                            id='forward'
                            name='position'
                            type='radio'
                            value='Forward'
                            checked
                          />
                          <label for='forward'>Forward</label>
                        </div>
                        <div>
                          <input
                            className='position-radio-button'
                            id='defense'
                            name='position'
                            type='radio'
                            value='Defense'
                          />
                          <label for='defense'>Defense</label>
                        </div>
                        <div>
                          <input
                            className='position-radio-button'
                            id='goalie'
                            name='position'
                            type='radio'
                            value='Goalie'
                          />
                          <label for='goalie'>Goalie</label>
                        </div>
                      </div>
                      {selectedGame.players &&
                      selectedGame.players.includes(this.props.auth._id) ? (
                        <button
                          className='delete-game-button'
                          onClick={this.handleOnDeleteGame}
                        >
                          Quit Game
                        </button>
                      ) : (
                        <button
                          className='book-game-button'
                          onClick={this.handleOnSubmitBookGame}
                        >
                          Book Game
                        </button>
                      )}
                    </div>
                  </Modal>
                </div>
              );
            }
          })}
          {/* Login Modal  */}
          <Modal open={open} onClose={this.onCloseModal} center>
            <LoginForm />
          </Modal>
          {/* Game details Modal */}
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
