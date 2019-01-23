import React, { Component } from 'react';
import Home from './components/Home';
import { connect } from 'react-redux';
import * as actions from './actions';

import './App.scss';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className='App'>
        <Home />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
