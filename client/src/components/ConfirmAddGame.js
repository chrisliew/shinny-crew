import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class ConfirmAddGame extends Component {
  componentDidMount() {
    this.props.fetchOneGame(this.props.match.params.id);
  }
  render() {
    const gameId = this.props.match.params.id;
    const { selectedGame } = this.props;
    return (
      <div className='confirm-add-game'>
        <Card
          id='card-confirm'
          body
          inverse
          style={{ backgroundColor: '#333', borderColor: '#333' }}
        >
          <CardTitle>Game Confirmation</CardTitle>
          <CardText>
            <p>
              You have added this game! You can find more details{' '}
              <a href={`/game/${gameId}`}>here</a>
            </p>
            <p>
              {' '}
              Date: {selectedGame.startDate}
              <br />
              Time: {selectedGame.startTime}
              <br />
              Arena: {selectedGame.arena}
              <br />
              Address: {selectedGame.address}
              <br />
            </p>
            <p>
              You will receive an email with details shortly. Have a fun and
              safe time with Shinny Squad.{' '}
            </p>
          </CardText>
        </Card>
        <div>
          <br />
          <Link to='/landing'>
            <Button color='success'>View Games</Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectedGame: state.fetchOneGame };
};

export default connect(
  mapStateToProps,
  actions
)(ConfirmAddGame);
