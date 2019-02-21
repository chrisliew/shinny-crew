import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
  render() {
    return (
      <div>
        <StripeCheckout
          name='Shinny Squad'
          description='Payment for this game @'
          currency='CAD'
          amount={1800}
          token={token => console.log(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className='book-game-button'>Pay For Game</button>
        </StripeCheckout>
      </div>
    );
  }
}

export default Payments;
