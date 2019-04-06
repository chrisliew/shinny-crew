import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Button,
  // Modal,
  Card,
  CardTitle,
  CardText
} from 'reactstrap';
import Modal from 'react-responsive-modal';
import Payments from './Payments';
import { toast } from 'react-toastify';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [],
      player: [],
      gameTime: '',
      currentTime: new Date(),
      modal: false,
      openGame: false,
      position: ''
    };
  }

  onOpenGameModal = () => {
    this.setState({ openGame: true });
  };

  onCloseGameModal = () => {
    this.setState({ openGame: false });
  };

  toggle = userInfo => event => {
    event.preventDefault();
    const playerInfo = userInfo.filter(
      player => player.userID === this.props.auth._id
    );
    this.setState(prevState => ({
      modal: !prevState.modal,
      position: playerInfo[0].position
    }));
  };

  componentDidMount() {
    this.props.fetchOneGame(this.props.match.params.id);
  }

  handleDeleteGame = userInfo => event => {
    event.preventDefault();
    const playerInfo = userInfo.filter(
      player => player.userID === this.props.auth._id
    );
    playerInfo[0]['gameId'] = this.props.selectedGame._id;
    this.props.deleteUserFromGame(playerInfo[0]);

    const { selectedGame, auth } = this.props;

    const userInfoEmail = {
      email: auth.email,
      startDate: selectedGame.startDate,
      address: selectedGame.address,
      gameId: selectedGame._id,
      name: auth.firstName,
      startTime: selectedGame.startTime,
      arena: selectedGame.arena
    };
    this.props.sendEmailRefund(userInfoEmail);
    toast.success('You have successfully deleted this game');
    window.location.href = `/cancelled-game/${selectedGame._id}`;
  };

  handleSelectOneGame = game => event => {
    event.preventDefault();

    if (!this.props.auth && !document.cookie) {
      window.location.href = '/login';
    } else {
      this.onOpenGameModal();
    }
  };

  handleOnChangePosition = event => {
    this.setState({
      position: event.target.value
    });
  };

  handleOnSubmitBookGame = event => {
    const userId = this.props.auth._id;
    const gameId = this.props.selectedGame._id;
    const firstName = this.props.auth.firstName;
    const lastName = this.props.auth.lastName;
    const { selectedGame, auth } = this.props;

    const gameUserIdPosition = {
      userId: userId,
      gameId: gameId,
      position: this.state.position,
      firstName: firstName,
      lastName: lastName
    };

    this.props.addGameUserRequest(gameUserIdPosition);

    const userInfo = {
      email: auth.email,
      startDate: selectedGame.startDate,
      address: selectedGame.address,
      gameId: gameId,
      name: auth.firstName,
      startTime: selectedGame.startTime,
      arena: selectedGame.arena,
      position: this.state.position
    };
    this.props.sendEmailConfirm(userInfo);
    window.location.href = `/confirm-game/${this.props.selectedGame._id}`;
  };

  render() {
    const game = this.props.selectedGame;
    const gameStartTime = moment(`${game.startDate} ${game.startTime}`);
    const authId = this.props.auth._id;

    const now = moment(new Date());
    const duration = moment.duration(gameStartTime.diff(now));
    const hoursBeforeStartOfGame = duration.asHours();
    const { openGame } = this.state;

    return (
      <div className='confirm-add-game'>
        <Card
          id='card-confirm'
          body
          inverse
          style={{ backgroundColor: '#333', borderColor: '#333' }}
        >
          <CardTitle>Game Details</CardTitle>
          <CardText>
            <ul className='game-info-list'>
              <li>Start Date: {game.startDate}</li>
              <li>Arena: {game.arena}</li>
              <li>Address: {game.address}</li>
              <li>Start Time: {game.startTime}</li>
              <li>End Time: {game.endTime}</li>
              <li>Skill Level: {game.skill}</li>
            </ul>
            {hoursBeforeStartOfGame > 48 &&
            game.players &&
            game.players.filter(player => player.userID === authId).length >
              0 ? (
              <div>
                <div className='registration-status'>
                  You Are Registered as a{' '}
                  <span className='position'>
                    {
                      game.players.filter(player => player.userID === authId)[0]
                        .position
                    }
                  </span>
                </div>
                <br />
                <Button
                  color='danger'
                  onClick={
                    document.cookie
                      ? this.handleDeleteGame(game.players)
                      : (window.location.href = '/login')
                  }
                >
                  Delete Game
                </Button>
              </div>
            ) : (
              <div className='no-refund-warning'>
                {game.players &&
                game.players.filter(player => player.userID === authId)
                  .length === 0 ? (
                  <Link to='/landing'>
                    <Button
                      color='danger'
                      onClick={this.handleSelectOneGame(game._id)}
                    >
                      Join Game
                    </Button>
                  </Link>
                ) : null}
                <div>
                  Within 48 hours of the game, no refund available, only
                  transfers. Click here to see why.
                </div>
              </div>
            )}
          </CardText>

          {/* <Button color='success' onClick={this.toggle(game.players)}>
            Change Positions
          </Button> */}
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
                Skill: {game.skill} <br />
                Arena: {game.arena} <br />
                Address: {game.address} <br />
                Date: {game.startDate} <br />
                Start Time: {game.startTime} <br />
                End Time: {game.endTime} <br />
                <br />
              </p>
              {game.players &&
              game.players
                .map(player => player.userID)
                .includes(this.props.auth._id) ? (
                <div>
                  Registered as{' '}
                  <span className='position'>
                    {
                      game.players.filter(player => player.userID === authId)[0]
                        .position
                    }
                  </span>
                  <br />
                  <br />
                  <div>
                    <button
                      className='delete-game-button'
                      onClick={this.handleDeleteGame(
                        game.players.filter(
                          player => player.userID === authId
                        )[0].position
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
                  {game.forwardSlots > 0 ? (
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
                  {` Forward - ${game.forwardSlots} spots remaining`}
                  <br />
                  {game.defensemanSlots > 0 ? (
                    <input
                      type='radio'
                      name='position'
                      value='defenseman'
                      onChange={this.handleOnChangePosition}
                    />
                  ) : (
                    <input
                      type='radio'
                      name='position'
                      value='defenseman'
                      onChange={this.handleOnChangePosition}
                      disabled
                    />
                  )}
                  {` Defenseman - ${game.defensemanSlots} spots remaining`}
                  <br />
                  {game.goalieSlots > 0 ? (
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
                  {` Goalie - ${game.goalieSlots} spots remaining`}
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
                    this.state.position === 'defenseman' ? (
                      <Payments position={this.state.position}>
                        Pay Now
                      </Payments>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </Card>
        <div>
          <br />
          <Link to='/landing'>
            <Button color='success'>View Upcoming Games</Button>
          </Link>
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
