import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import AddGame from './components/AddGame';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import UserGames from './components/UserGames';
import Game from './components/Game';

import './App.scss';
import 'react-dropdown/style.css';
import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route exact path='/games/new' component={AddGame} />
          <Route exact path='/landing' component={Landing} />
          <Route exact path='/games' component={UserGames} />
          <Route path='/game/:id' component={Game} />
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  actions
)(App);
