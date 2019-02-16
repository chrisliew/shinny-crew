import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
      userId: ''
    };
  }
  componentDidMount() {
    this.props.fetchGames();
  }

  handleOnSubmit = event => {
    event.preventDefault();
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
    const gamesList = games.map(game => {
      if (game.players.includes(this.props.auth._id)) {
        return (
          <tr>
            <td>{game.startDate}</td>
            <td>{game.arena}</td>
            <td>{game.address}</td>
            <td>{game.startTime}</td>
            <td>{game.endTime}</td>
            <td>{game.skill}</td>
            <td>
              {new Date() < new Date(game.startDate) ? (
                <button className='book-game-button'>Edit</button>
              ) : (
                <div>
                  <button>Previous Game</button>
                </div>
              )}
            </td>
          </tr>
        );
      } else {
        return null;
      }
    });

    return (
      <div className='user-games'>
        <h2>Your Games</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Arena</th>
              <th>Address</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Skill</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{gamesList}</tbody>
        </table>
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
)(UserGames);
