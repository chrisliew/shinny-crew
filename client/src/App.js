import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      data: ''
    };
  }

  componentDidMount() {
    axios.get('/api/current_user').then(res => {
      this.setState({
        displayName: res.data.displayName,
        data: res.data
      });
    });
  }

  render() {
    console.log(this.state.displayName);
    return (
      <div className='App'>
        <h1>Shinny Crew</h1>
        <span>
          Logged in as {this.state.displayName} with {this.state.data.provider}
        </span>
        <a href='/auth/google'>Login with Google</a>
        <a href='/api/logout'>Logout</a>
        <a href='/api/current_user'>Current User</a>
        <a href='/auth/facebook'>Login with Facebook</a>
        <div>{}</div>
      </div>
    );
  }
}
export default App;
