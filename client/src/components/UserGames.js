import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
class UserGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
      userId: ''
    };
  }

  componentDidMount() {
    // this.props.fetchGames();
    this.setState({ authId: this.props.auth._id });
    this.props.fetchUserGames(this.props.match.url.slice(7));
  }

  handleOnSubmit = event => {
    event.preventDefault();
  };

  render() {
    console.log('params', this.props.match.url.slice(7));

    const games = this.props.userGames.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );
    const authID = this.props.auth._id;

    const gamesList = games.map(game => {
      //loop through list, then return game.
      return (
        <tr>
          <td>{game.startDate}</td>
          <td>{game.arena}</td>
          <td>{game.address}</td>
          <td>{game.startTime}</td>
          <td>{game.endTime}</td>
          <td>{game.skill}</td>
          <td>{game._id}</td>
          <td>
            {new Date() < new Date(game.startDate) ? (
              <Link to={`/game/${game._id}`}>
                <button className='book-game-button'>Edit</button>
              </Link>
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
        auth ID {this.props.auth._id}
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
