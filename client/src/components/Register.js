import React, { Component } from 'react';
import axios from 'axios';

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
      return alert('passwords dont match!');
    }
    const registerInfo = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };

    axios.post('/api/register', registerInfo).then(res => {
      console.log('res!!!!', res);
      const emailAlreadyExists = res.data.email;
      console.log('res.data.email', res.data.email);

      if (emailAlreadyExists === 'Email already exists') {
        alert('Email or Username already exists');
        return;
      } else {
        alert('Register successful');
        // window.location.replace('/');
        axios.post('/api/login', registerInfo).then(res => {
          console.log('res.data', res);
          if (res.data) {
            window.location.replace('/');
          }
        });
      }
      //   if (res) {
      //     localStorage.setItem('token', token);
      //     window.location.replace('/');
      //   } else if (registerFailed) {
      //     alert('Email Or Username already exists');
      //   }
      // });

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
                placeholder='username'
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
