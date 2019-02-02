import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UpcomingGamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }
  componentDidMount() {
    this.props.fetchGames();
  }
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

    return (
      <div className='upcoming-games'>
        <div>Filter By Skill:</div>
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
                    <br />
                    <br />
                    <a href='/' className='book-game-button'>
                      Book Game
                    </a>
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
    games: state.fetchGames
  };
};

export default connect(
  mapStateToProps,
  actions
)(UpcomingGamesList);
