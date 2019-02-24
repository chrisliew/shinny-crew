import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  loggedInStatus = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href='/auth/google'>Login</a>;
      default:
        return [
          <div key='1' className='navbar-logged-in'>
            <a href={`/games/${this.props.auth._id}`}>Your Games</a>
            <div>Logged in as {this.props.auth.displayName} </div>
            <a href='/api/logout'>Logout</a>
          </div>
        ];
    }
  };
  render() {
    return (
      <div className='header'>
        <div>
          <Navbar className='py-0' light expand='md'>
            <NavbarBrand href='/'>Shinny Squad</NavbarBrand>
            <NavbarBrand href='/'>How It Works</NavbarBrand>
            <NavLink href='/games/new'>Add Game</NavLink>
            <NavLink href='/landing'>Upcoming Game</NavLink>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>{this.loggedInStatus()}</NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
