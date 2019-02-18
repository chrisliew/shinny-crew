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
      openGame: false,
      position: 'forward',
      gameUsersId: []
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

    const gameUserIdPosition = {
      userId: userId,
      gameId: gameId,
      position: this.state.position
    };

    if (!this.props.auth.games.includes(gameId)) {
      this.props.addGameUserRequest(gameUserIdPosition);
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

  handleOnChangePosition = event => {
    this.setState({
      position: event.target.value
    });
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
      <div id='upcoming-games' className='upcoming-games'>
        <h2>Upcoming Games</h2>
        <div className='games'>
          {games.map(game => {
            if (new Date() < new Date(game.startDate)) {
              return (
                <div className='game-container' key={game._id}>
                  <div className='image-container'>
                    <div className='game-price'>${game.price}</div>
                    <img className='game-picture' alt='' />
                  </div>
                  <div className='game-details-container'>
                    <div className='game-details-table'>
                      <table>
                        <tbody>
                          <tr className='skill'>
                            <td>{game.skill} Skill</td>
                          </tr>
                          <tr>
                            <td>Date: {game.startDate}</td>
                          </tr>
                          <tr>
                            <td>
                              Time: {game.startTime} to {game.endTime}
                            </td>
                          </tr>
                          <tr>
                            <td>Location: {game.arena}</td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                target='_blank'
                                rel='noopener noreferrer'
                                href={`https://maps.google.com/?q=${
                                  game.arena
                                }${game.address}`}
                              >
                                {game.address}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className='game-details'>
                      Forward Spots Remaining:{' '}
                      <span className='slots'>{game.forwardSlots}</span> <br />
                      Defense Spots Remaining:{' '}
                      <span className='slots'>{game.defenseSlots}</span> <br />
                      Goalie Spots Remaining:{' '}
                      <span className='slots'>{game.goalieSlots}</span> <br />
                      <br />
                    </p>
                    <div>
                      {this.props.auth &&
                      game.players
                        .map(player => player.userID)
                        .includes(this.props.auth._id) ? (
                        <div key={game._id}>
                          Registered
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
                        <br />
                        <input
                          type='radio'
                          name='position'
                          value='forward'
                          onChange={this.handleOnChangePosition}
                          defaultChecked
                        />{' '}
                        Forward
                        <br />
                        <input
                          type='radio'
                          name='position'
                          value='defense'
                          onChange={this.handleOnChangePosition}
                        />{' '}
                        Defense
                        <br />
                        <input
                          type='radio'
                          name='position'
                          value='goalie'
                          onChange={this.handleOnChangePosition}
                        />{' '}
                        Goalie
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
            return null;
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
