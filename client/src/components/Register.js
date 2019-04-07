import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: ''
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    // Add check here
    if (this.state.password !== this.state.password2) {
      return toast.error('passwords dont match!');
    }
    if (this.state.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (this.state.email.length > 30) {
      toast.error('Email must be less than 30 characters');
      return;
    }
    if (this.state.username.length > 30) {
      toast.error('Username must be less than 30 characters');
      return;
    }
    if (this.state.password.length > 30) {
      toast.error('Password must be less than 30 characters');
      return;
    }
    const registerInfo = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };

    axios.post('/api/register', registerInfo).then(res => {
      const emailAlreadyExists = res.data.email;

      if (emailAlreadyExists === 'Email already exists') {
        toast.error(
          'Email or Username already exists.  Try Facebook or Google Login'
        );
        return;
      } else {
        toast.success('Register successful');
        axios.post('/api/login', registerInfo).then(res => {
          if (res.data) {
            window.location.replace('/');
          }
        });
      }
      this.setState({
        email: '',
        username: '',
        password: '',
        password2: ''
      });
    });
  };

  render() {
    return (
      <div>
        <div className='register'>
          <div className='register-container'>
            <img className='logo' src='/images/puck.png' alt='puck' />

            <h3 className='title'>
              Shinny Squad <br />
              Register
            </h3>
            <div>
              <a href='/auth/google'>
                <img
                  className='google-login-button'
                  src='/images/google-login-2.png'
                  alt='login with google'
                />
              </a>
            </div>
            <div>
              <a href='/auth/facebook'>
                <img
                  className='facebook-login-button'
                  src='/images/facebook-login.png'
                  alt='login with facebook'
                />
              </a>
            </div>
            <form onSubmit={this.handleOnSubmit} className='register-form'>
              <input
                onChange={this.handleOnChange}
                value={this.state.email}
                type='email'
                name='email'
                placeholder='Email'
              />
              <input
                onChange={this.handleOnChange}
                value={this.state.username}
                type='text'
                name='username'
                placeholder='Username'
              />
              <input
                onChange={this.handleOnChange}
                value={this.state.password}
                type='password'
                name='password'
                placeholder='Password'
              />
              <input
                onChange={this.handleOnChange}
                value={this.state.password2}
                type='password'
                name='password2'
                placeholder='Matching password'
              />
              <button className='register-button'>Register</button>
            </form>
            <a href='/login'>Login here</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
