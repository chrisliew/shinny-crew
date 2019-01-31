import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

import Home from './components/Home';
import AddGame from './components/AddGame';
import Navbar from './components/Navbar';

import './App.scss';
import 'react-dropdown/style.css';
import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className='App'>
        <Navbar />
        <Home />
        {/* <AddGame /> */}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
