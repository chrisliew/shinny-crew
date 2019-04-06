import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Table, Button } from 'reactstrap';
import moment from 'moment';

class UserGames extends Component {
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
      console.log('game', game);
      // const position = game.players.filter(
      //   player => player.userID === this.props.auth._id
      // ).position;
      // console.log('position', position);
      return (
        <tr key={game._id}>
          <td>{game.startDate}</td>
          <td>{game.arena}</td>
          <td>{game.address}</td>
          <td>{game.startTime}</td>
          <td>{game.endTime}</td>
          <td>{game.skill}</td>
          <td>
            {
              game.players.filter(
                player => player.userID === this.props.auth._id
              )[0].position
            }
          </td>
          <td>
            {new Date() <= moment(game.startDate + ' ' + game.startTime) ? (
              <a href={`/game/${game._id}`}>
                <Button className='book-game-button' size='sm' color='success'>
                  Edit
                </Button>
              </a>
            ) : (
              <div>
                <Button size='sm'>Previous Game</Button>
              </div>
            )}
          </td>
        </tr>
      );
    });

    return (
      <div className='user-games'>
        <h2>Your Games</h2>
        <Table hover striped responsive bordered>
          <thead>
            <tr>
              <th>Date</th>
              <th>Arena</th>
              <th>Address</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Skill</th>
              <th>Position</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{gamesList}</tbody>
        </Table>
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
