import React, { Component } from 'react';
import { connect } from 'react-redux';
import Payments from './Payments';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
            <NavItem>
              <a href='/games'>Your Games</a>
            </NavItem>
            <NavItem>
              <div>Logged in as {this.props.auth.displayName} </div>
            </NavItem>
            <NavItem>
              <li>
                <a href='/api/logout'>Logout</a>
              </li>
            </NavItem>
            <NavItem>
              <Button size='md' color='success'>
                Book Game
              </Button>
            </NavItem>
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
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>{this.loggedInStatus()}</NavItem>
                {/* <NavItem>
                  <NavLink href='/'>Book Game</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Contact</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>About Us</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        {/* <Navbar className='navbar-left child'>
          <NavbarBrand href='/'>Shinny Squad</NavbarBrand>
          <div>
            <a href='/games/new'>Add Game</a>
          </div>
          <div>
            <a href='/how-it-works'>How It Works</a>
          </div>
          <div>
            <a href='/contact'>Contact</a>
          </div>
        </Navbar>
        <div className='child'>{this.loggedInStatus()}</div> */}
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
