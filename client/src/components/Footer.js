import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className='footer-distributed'>
          <div className='footer-left'>
            <h3>Shinny Squad</h3>
            <p className='footer-links'>
              <Link to='/'>Home</Link>·{/* <Link to='/'>Terms</Link>· */}
              {/* <Link to='/'>Faq</Link>· */}
              <Link to='/contact'>Contact</Link>
            </p>
            <p className='footer-company-name'>Shinny Squad &copy; 2019</p>
          </div>
          <div className='footer-center'>
            <div>
              <i className='fa fa-map-marker' />
              <p>
                <span>388 Drake Street</span> Vancouver, BC
              </p>
            </div>
            {/* <div>
              <i className='fa fa-phone' />
              <p>604-358-0775</p>
            </div> */}
            {/* <div>
              <i className='fa fa-envelope' />
              <p>
                <Link to='mailto:support@company.com'>support@washroyal.com</Link>
              </p>
            </div> */}
          </div>
          <div className='footer-right'>
            <p className='footer-company-about'>
              <span>About the company</span>
              Shinny Squad was created by hockey players, for hockey players. We
              are dedicated to making drop in hockeys easy and quick to join.
            </p>
            <div className='footer-icons'>
              <Link to='/'>
                <i className='fab fa-facebook' />
              </Link>
              <Link to='/'>
                <i className='fab fa-twitter' />
              </Link>
              <Link to='/'>
                <i className='fab fa-instagram' />
              </Link>
              {/* <Link to='/'>
                <i className='fab fa-github' />
              </Link> */}
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
