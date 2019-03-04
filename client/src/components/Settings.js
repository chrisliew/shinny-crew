import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input
} from 'reactstrap';
import * as actions from '../actions';
import { validateEmail } from './Validators';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: ''
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleOnChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    if (!validateEmail(this.state.email)) {
      alert('Not a valid email');
    } else {
      const emailUserId = {
        email: this.state.email,
        userId: this.props.auth._id
      };
      this.props.changeEmail(emailUserId);
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
      window.location.reload();
    }
  };

  render() {
    return (
      <div className='settings'>
        <h1>Settings</h1>
        <div className='container'>
          <div className='email'>Email: {this.props.auth.email}</div>
          <div>
            <Button color='danger' onClick={this.toggle}>
              Edit
            </Button>
          </div>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Edit Email</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleOnSubmit}>
              <Input
                onChange={this.handleOnChangeEmail}
                value={this.state.email}
                placeholder='Enter new email'
              />
              <ModalFooter>
                <Button color='primary' onClick={this.handleOnSubmit}>
                  Submit
                </Button>{' '}
                <Button color='secondary' onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(Settings);
