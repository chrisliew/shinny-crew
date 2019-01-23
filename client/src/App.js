import React, { Component } from 'react';
import Home from './components/Home';
import { connect } from 'react-redux';
import { simpleAction } from './actions/simpleAction';

import './App.scss';

class App extends Component {
  simpleAction = event => {
    this.props.simpleAction();
  };

  render() {
    return (
      <div className='App'>
        <Home />
        <button onClick={this.simpleAction}>Simple Action</button>
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
