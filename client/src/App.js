import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import AddGame from './components/AddGame';
import Header from './components/Header';
import Landing from './components/Landing';
import UserGames from './components/UserGames';
import Game from './components/Game';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import TermsAndConditions from './components/TermsAndConditions';
import ConfirmAddGame from './components/ConfirmAddGame';
import Footer from './components/Footer';

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
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/games/new' component={AddGame} />
          <Route exact path='/landing' component={Landing} />
          <Route exact path='/games' component={UserGames} />
          <Route exact path='/how-it-works' component={HowItWorks} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/confirm-game' component={ConfirmAddGame} />
          <Route
            exact
            path='/terms-and-conditions'
            component={TermsAndConditions}
          />
          <Route path='/game/:id' component={Game} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  actions
)(App);
