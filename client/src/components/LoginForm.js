import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
    return (
      <div className='login'>
        <button className='loginBtn loginBtn--google'>
          Sign in With Google
        </button>
        <form>
          <input className='login-input' placeholder='Sign In/Register Email' />
          <br />
          <input
            className='login-input'
            placeholder='Sign In/Register Password'
          />
          <br />
          <a href='/' class='login-submit-button'>
            Sign In/Register
          </a>
        </form>
      </div>
    );
  }
}

export default LoginForm;
