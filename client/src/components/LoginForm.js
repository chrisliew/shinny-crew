import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const userLogin = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:3000/api/login', userLogin).then(res => {
      const token = res.data.token;
      const loginFailed = res.data.loginFailed;

      if (token) {
        localStorage.setItem('token', token);
        window.location.replace('/');
      } else if (loginFailed) {
        alert('Username or password incorrect');
      }
    });
    this.setState({
      email: '',
      password: ''
    });
  };

  render() {
    return (
      <div className='login'>
        <div className='login-container'>
          <img className='logo' src='/images/puck.png' />
          <h3 className='title'>Sign In</h3>
          <form onSubmit={this.handleOnSubmit} className='login-form'>
            <input
              onChange={this.handleOnChange}
              value={this.state.email}
              type='email'
              name='email'
              placeholder='Email'
            />
            <input
              onChange={this.handleOnChange}
              value={this.state.password}
              type='password'
              name='password'
              placeholder='Password'
            />
            <button className='login-button'>Sign In</button>
          </form>
          <div>
            <a href='/auth/google'>Sign In With Google</a>
          </div>
          <div>
            <a href='/auth/facebook'>Sign In With Facebook</a>
          </div>

          <div className='forgot-password'>Forgot Your Password?</div>
          <a href='/register' className='register'>
            Register here
          </a>
        </div>
      </div>
    );
  }
}

export default LoginForm;
