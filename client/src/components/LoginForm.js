import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
    return (
      <div className='login'>
        <a href='/auth/google' className='loginBtn loginBtn--google'>
          Login with Google
        </a>
        <form>
          <input className='login-input' placeholder='Sign In/Register Email' />
          <br />
          <input
            className='login-input'
            placeholder='Sign In/Register Password'
          />
          <br />
          <a href='/' className='login-submit-button'>
            Sign In/Register
          </a>
        </form>
      </div>
    );
  }
}

export default LoginForm;
