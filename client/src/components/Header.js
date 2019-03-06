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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
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
            <div className='display-name'>
              Hello {this.props.auth.displayName}
            </div>
            <a href={`/games/${this.props.auth._id}`}>Your Games</a>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <i className='fas fa-cog' />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <a href='/settings'>Settings</a>
                </DropdownItem>
                <DropdownItem>
                  <a href='/contact-us'>Contact Us</a>
                </DropdownItem>
                <DropdownItem>
                  <a href={`/games/${this.props.auth._id}`}>Your Games</a>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem>
                  <a href='/api/logout'>Logout</a>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
            {this.props.auth._id === '5c7b0b253f0801dc2228f66a' ? (
              <NavLink href='/games/new'>Add Game</NavLink>
            ) : null}
            <NavLink href='/landing'>Upcoming Game</NavLink>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {this.loggedInStatus()}
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
