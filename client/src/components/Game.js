import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [],
      player: [],
      gameTime: '',
      currentTime: new Date(),
      modal: false
    };
  }

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
      name: auth.displayName,
      startTime: selectedGame.startTime,
      arena: selectedGame.arena
    };

    this.props.sendEmailRefund(userInfoEmail);
    alert('You have successfully deleted this game')(
      (window.location.href = '/landing')
    );
  };

  render() {
    const game = this.props.selectedGame;
    const gameStartTime = moment(`${game.startDate} ${game.startTime}`);
    const authId = this.props.auth._id;

    const now = moment(new Date());
    const duration = moment.duration(gameStartTime.diff(now));
    const hoursBeforeStartOfGame = duration.asHours();

    return (
      <div className='game'>
        <h1>Game</h1>
        <div className='game-details'>
          <ul>
            <li>Start Date: {game.startDate}</li>
            <li>Arena: {game.arena}</li>
            <li>Address: {game.address}</li>
            <li>Start Time: {game.startTime}</li>
            <li>End Time: {game.endTime}</li>
            <li>Skill Level: {game.skill}</li>
          </ul>
          {hoursBeforeStartOfGame > 48 &&
          game.players &&
          game.players.filter(player => player.userID === authId).length > 0 ? (
            <Button
              color='danger'
              onClick={this.handleDeleteGame(game.players)}
            >
              Delete Game
            </Button>
          ) : (
            <div className='no-refund-warning'>
              {game.players &&
              game.players.filter(player => player.userID === authId).length ===
                0 ? (
                <Button
                  color='danger'
                  onClick={this.handleDeleteGame(game.players)}
                >
                  Register Game
                </Button>
              ) : null}
              <div>
                Within 48 hours of the game, no refund available, only
                transfers. Click here to see why.
              </div>
            </div>
          )}

          {/* <Button color='success' onClick={this.toggle(game.players)}>
            Change Positions
          </Button> */}
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Change Positions</ModalHeader>
            <ModalBody>Current Position: </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.toggle}>
                Do Something
              </Button>{' '}
              <Button color='secondary' onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
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
)(Game);
