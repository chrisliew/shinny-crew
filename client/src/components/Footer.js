import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className='footer-distributed'>
          <div className='footer-left'>
            <h3>Shinny Squad</h3>
            <p className='footer-links'>
              <a href='/'>Home</a>·<a href='/terms-and-conditions'>Terms</a>·
              <a href='/'>Faq</a>·<a href='/'>Contact</a>
            </p>
            <p className='footer-company-name'>Shinny Squad &copy; 2019</p>
          </div>
          <div className='footer-center'>
            <div>
              <i className='fa fa-map-marker' />
              <p>
                <span>123 Fake Street</span> Vancouver, BC
              </p>
            </div>
            <div>
              <i className='fa fa-phone' />
              <p>604-358-0775</p>
            </div>
            <div>
              <i className='fa fa-envelope' />
              <p>
                <a href='mailto:support@company.com'>support@washroyal.com</a>
              </p>
            </div>
          </div>
          <div className='footer-right'>
            <p className='footer-company-about'>
              <span>About the company</span>
              Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
              euismod convallis velit, eu auctor lacus vehicula sit amet.
            </p>
            <div className='footer-icons'>
              <a href='/'>
                <i className='fab fa-facebook' />
              </a>
              <a href='/'>
                <i className='fab fa-twitter' />
              </a>
              <a href='/'>
                <i className='fab fa-linkedin' />
              </a>
              <a href='/'>
                <i className='fab fa-github' />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
