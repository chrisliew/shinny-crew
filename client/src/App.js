import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Shinny Crew</h1>
        <a href='/auth/google'>Login</a>
        <a href='/api/logout'>Logout</a>
        <a href='/api/current_user'>Current User</a>
      </div>
    );
  }
}
export default App;
