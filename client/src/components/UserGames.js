import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserGames extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserGames(this.props.match.url.slice(7));
  }

  handleOnSubmit = event => {
    event.preventDefault();
  };

  render() {
    const games = this.props.userGames.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    const gamesList = games.map(game => {
      //loop through list, then return game.
      return (
        <tr key={game._id}>
          <td>{game.startDate}</td>
          <td>{game.arena}</td>
          <td>{game.address}</td>
          <td>{game.startTime}</td>
          <td>{game.endTime}</td>
          <td>{game.skill}</td>
          <td>{game._id}</td>
          <td>
            {new Date() < new Date(game.startDate) ? (
              <a href={`/game/${game._id}`}>
                <button className='book-game-button'>Edit</button>
              </a>
            ) : (
              <div>
                <button>Previous Game</button>
              </div>
            )}
          </td>
        </tr>
      );
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
              <th>gameId</th>
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
    auth: state.auth,
    userGames: state.fetchUserGames
  };
};

export default connect(
  mapStateToProps,
  actions
)(UserGames);
