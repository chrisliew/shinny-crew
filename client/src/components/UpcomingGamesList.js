import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Modal from 'react-responsive-modal';
import LoginForm from './LoginForm';
import Payments from './Payments';
import { Button } from 'reactstrap';

class UpcomingGamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      gameId: '',
      userId: '',
      openGame: false,
      position: '',
      gameUsersId: [],
      loading: true
    };
  }
  componentDidMount() {
    this.props.fetchGames();
    this.setState({ loading: false });
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

    // if (!this.props.auth.games.includes(gameId)) {
    this.props.addGameUserRequest(gameUserIdPosition);
    // alert('You have successfully registered for this game');
    window.location.href = `/confirm-game/${this.props.selectedGame._id}`;
    // } else {
    // alert('You have already registered for this game');
    // }
  };

  handleOnDeleteGame = userInfo => event => {
    event.preventDefault();
    const userID = this.props.auth._id;
    const gameId = this.props.selectedGame._id;

    const gameUserIdPosition = {
      userID: userID,
      gameId: gameId,
      position: userInfo.position,
      stripeChargeId: userInfo.stripeChargeId
    };
    this.props.deleteUserFromGame(gameUserIdPosition);
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

                    <div>
                      {this.props.auth &&
                      game.players
                        .map(player => player.userID)
                        .includes(this.props.auth._id) ? (
                        <div key={game._id}>
                          You Are Registered as a{' '}
                          <span className='position'>
                            {
                              game.players[
                                game.players.findIndex(x => x.userID)
                              ].position
                            }
                          </span>
                          <br />
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
                        <div>
                          <p className='game-details'>
                            Forward Spots Remaining:{' '}
                            <span className='slots'>{game.forwardSlots}</span>{' '}
                            <br />
                            Defense Spots Remaining:{' '}
                            <span className='slots'>
                              {game.defenseSlots}
                            </span>{' '}
                            <br />
                            Goalie Spots Remaining:{' '}
                            <span className='slots'>
                              {game.goalieSlots}
                            </span>{' '}
                            <br />
                            <br />
                          </p>
                          <a href={`/games/${game._id}`}>
                            <button
                              onClick={this.handleSelectOneGame(game)}
                              className='book-game-button'
                              value={game._id}
                            >
                              Book Game
                            </button>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <Modal
                    className='choose-game-modal'
                    open={openGame}
                    onClose={this.onCloseGameModal}
                    center
                  >
                    <div className='game-details-modal'>
                      <h1>Game Details</h1>
                      Instructions: Bring gear, and go to changeroom #1 <br />
                      <br />
                      <p>
                        Skill: {selectedGame.skill} <br />
                        Arena: {selectedGame.arena} <br />
                        Address: {selectedGame.address} <br />
                        Date: {selectedGame.startDate} <br />
                        Start Time: {selectedGame.startTime} <br />
                        End Time: {selectedGame.endTime} <br />
                        <br />
                      </p>
                      {selectedGame.players &&
                      selectedGame.players
                        .map(player => player.userID)
                        .includes(this.props.auth._id) ? (
                        <div>
                          Registered as{' '}
                          <span className='position'>
                            {
                              selectedGame.players[
                                selectedGame.players.findIndex(x => x.userID)
                              ].position
                            }
                          </span>
                          <br />
                          <br />
                          <div>
                            <button
                              className='delete-game-button'
                              onClick={this.handleOnDeleteGame(
                                selectedGame.players[
                                  selectedGame.players.findIndex(x => x.userID)
                                ]
                              )}
                            >
                              Quit Game
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          Choose Your Position:
                          <br />
                          {selectedGame.forwardSlots > 0 ? (
                            <input
                              type='radio'
                              name='position'
                              value='forward'
                              onChange={this.handleOnChangePosition}
                            />
                          ) : (
                            <input
                              type='radio'
                              name='position'
                              value='forward'
                              onChange={this.handleOnChangePosition}
                              disabled
                            />
                          )}
                          {`Forward - ${
                            selectedGame.forwardSlots
                          } spots remaining`}
                          <br />
                          {selectedGame.defenseSlots > 0 ? (
                            <input
                              type='radio'
                              name='position'
                              value='defense'
                              onChange={this.handleOnChangePosition}
                            />
                          ) : (
                            <input
                              type='radio'
                              name='position'
                              value='defense'
                              onChange={this.handleOnChangePosition}
                              disabled
                            />
                          )}
                          {`Defense - ${
                            selectedGame.defenseSlots
                          } spots remaining`}
                          <br />
                          {selectedGame.goalieSlots > 0 ? (
                            <input
                              type='radio'
                              name='position'
                              value='goalie'
                              onChange={this.handleOnChangePosition}
                            />
                          ) : (
                            <input
                              type='radio'
                              name='position'
                              value='goalie'
                              onChange={this.handleOnChangePosition}
                              disabled
                            />
                          )}
                          {`Goalie - ${
                            selectedGame.goalieSlots
                          } spots remaining`}
                          <div>
                            {this.state.position === 'goalie' ? (
                              <Button
                                onClick={this.handleOnSubmitBookGame}
                                color='success'
                              >
                                Goalies Play Free!
                              </Button>
                            ) : null}
                            {this.state.position === 'forward' ||
                            this.state.position === 'defense' ? (
                              <Payments position={this.state.position}>
                                Pay Now
                              </Payments>
                            ) : null}
                          </div>
                        </div>
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
