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
import ContactUs from './components/ContactUs';
import TermsAndConditions from './components/TermsAndConditions';
import ConfirmAddGame from './components/ConfirmAddGame';
import Footer from './components/Footer';
import Settings from './components/Settings';
import Login from './components/Login';
import Register from './components/Register';
import ConfirmDeleteGame from './components/ConfirmDeleteGame';

import './App.scss';
import 'react-dropdown/style.css';
import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    // console.log('props!!', this.prop s);
    // this.props.fetchUserNormal();
  }
  render() {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/games/new' component={AddGame} />
          <Route exact path='/landing' component={Landing} />
          <Route path='/games/:userID' component={UserGames} />
          <Route exact path='/how-it-works' component={HowItWorks} />
          <Route exact path='/contact-us' component={ContactUs} />
          <Route path='/confirm-game/:id' component={ConfirmAddGame} />
          <Route path='/cancelled-game/:id' component={ConfirmDeleteGame} />
          <Route
            exact
            path='/terms-and-conditions'
            component={TermsAndConditions}
          />
          <Route path='/game/:id' component={Game} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actions
)(App);
