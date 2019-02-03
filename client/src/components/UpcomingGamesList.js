import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Modal from 'react-responsive-modal';
import LoginForm from './LoginForm';

class UpcomingGamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
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

  handleOnSubmit = event => {
    // When click book, check to see if there is user id in redux, if not prompt login, if there is, check if gameID is in the games array, if not, then add this game to the user, give success validation.
    // if booked already, don't show book button, only show the
    event.preventDefault();
    console.log('auth', this.props);
    console.log('value', event.target.value);
    // !this.props.auth.games.includes(event.target.value)

    if (!this.props.auth) {
      this.onOpenModal();
    } else {
      console.log('fuck');
      this.props.addGameUserRequest(event.target.value);
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
                  <p className='game-details'>
                    Date: {game.startDate} <br />
                    <br />
                    Arena: {game.arena} <br />
                    Address: {game.address} <br />
                    Start Time: {game.startTime} <br />
                    End Time: {game.endTime} <br />
                    Available Spots: {game.slots} <br />
                    Skill: {game.skill} <br />
                    Id: {game._id} <br />
                    <br />
                    <br />
                    <button
                      onClick={this.handleOnSubmit}
                      className='book-game-button'
                      value={game._id}
                    >
                      Book Game
                    </button>
                    <Modal open={open} onClose={this.onCloseModal} center>
                      <LoginForm />
                    </Modal>
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    games: state.fetchGames,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(UpcomingGamesList);
