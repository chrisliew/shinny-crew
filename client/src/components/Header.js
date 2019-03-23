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
import Modal from 'react-responsive-modal';
import LoginForm from './LoginForm';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      open: false,
      gameId: '',
      userId: '',
      openGame: false,
      position: '',
      gameUsersId: [],
      loading: true
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleOpenModal = () => {
    this.onOpenModal();
  };

  photoIcon = () => {
    switch (this.props.auth.photo) {
      case null:
        return;
      case false:
        return <i className='fas fa-cog' />;
      default:
        return (
          <img className='profile-photo' src={this.props.auth.photo} alt='' />
        );
    }
  };

  loggedInStatus = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <NavItem>
            <NavLink className='login-link' onClick={this.onOpenModal}>
              Login
            </NavLink>
          </NavItem>
        );
      default:
        return [
          <div key='1' className='navbar-logged-in'>
            {/* <div className='display-name'>
              {this.props.auth.photo ? null : (
                <div>Hello {this.props.auth.firstName}</div>
              )}
            </div> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {this.photoIcon()}
                {this.props.auth.firstName}
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
                <DropdownItem>
                  {this.props.auth.googleId === '116805417193712015830' ? (
                    <NavLink href='/games/new'>Add Game</NavLink>
                  ) : null}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        ];
    }
  };
  render() {
    const { open } = this.state;
    return (
      <div>
        <Navbar className='container-fluid p-0 header' light expand='md'>
          <NavbarBrand className='navbar-brand' href='/'>
            Shinny Squad
          </NavbarBrand>

          {/* <NavbarToggler onClick={this.toggle} /> */}

          {/* <Collapse isOpen={this.state.isOpen} navbar> */}
          <Nav className='ml-auto' navbar>
            <NavItem className='games-link'>
              <NavLink href='/landing'>Games</NavLink>
            </NavItem>
            {this.loggedInStatus()}
          </Nav>
          {/* </Collapse> */}
        </Navbar>
        {/* login modal */}
        <Modal open={open} onClose={this.onCloseModal} center>
          <LoginForm />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
