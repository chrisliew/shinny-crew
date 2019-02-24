import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
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
              .then(alert('You have successfully registered for this game'))
              .then((window.location.href = '/'))
          }
          allowRememberMe='true'
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className='book-game-button'>Pay For Game</button>
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
