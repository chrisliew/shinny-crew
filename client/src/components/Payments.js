import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  handleOnSubmitBookGame = event => {
    console.log('wtf', event);
    const userId = this.props.auth._id;
    const gameId = this.props.selectedGame._id;

    const gameUserIdPosition = {
      userId: userId,
      gameId: gameId,
      position: this.props.position
    };

    this.props.addGameUserRequest(gameUserIdPosition);
    const userInfo = {
      email: this.props.auth.email,
      startDate: this.props.selectedGame.startDate,
      address: '123 fake street'
    };
    this.props.sendEmailConfirm(userInfo);
    alert('You have  registered for this game');
    window.location.href = `/confirm-game/${this.props.selectedGame._id}`;
  };

  render() {
    return (
      <div>
        <StripeCheckout
          name='Shinny Squad'
          description='Payment for this game @'
          image='/images/puck.png'
          currency='CAD'
          amount={1800}
          email='service@shinnysquad.com'
          token={token =>
            this.props
              .handleToken({
                token: token,
                selectedGame: this.props.selectedGame,
                auth: this.props.auth,
                position: this.props.position
              })
              .then(() => this.handleOnSubmitBookGame)
              .then(alert('You have successfully registered for this game'))
              .then(
                (window.location.href = `/confirm-game/${
                  this.props.selectedGame._id
                }`)
              )
          }
          allowRememberMe='true'
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className='book-game-button'>Pay For Game</button>
          <p className='payment-mandatory'>No cancellation 48 hours before </p>
        </StripeCheckout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectedGame: state.fetchOneGame, auth: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(Payments);
