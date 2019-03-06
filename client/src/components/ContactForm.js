import React, { Component } from 'react';
import axios from 'axios';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: '',
      contactEmail: '',
      contactNumber: '',
      message: ''
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();

    const clientInfo = {
      name: this.state.contactName,
      email: this.state.contactEmail,
      phone: this.state.contactNumber,
      message: this.state.message
    };
    axios
      .post('/api/email/contact', clientInfo)
      .then(console.log('Sent email with Contact Info'))
      .catch(error => {
        return error;
      });
    this.setState({
      contactName: '',
      contactEmail: '',
      contactNumber: '',
      message: ''
    });

    alert(
      'Thank you for contacting us.  Shinny Squad will contact you shortly.'
    );
  };

  render() {
    return (
      <div className='contact-form'>
        <form onSubmit={this.handleOnSubmit}>
          <input
            onChange={this.handleOnChange}
            name='contactName'
            value={this.state.contactName}
            title='name'
            placeholder='Name'
          />
          <input
            onChange={this.handleOnChange}
            name='contactEmail'
            value={this.state.contactEmail}
            title='email'
            placeholder='Email'
          />
          <input
            onChange={this.handleOnChange}
            name='contactNumber'
            value={this.state.contactNumber}
            title='number'
            placeholder='Contact Number'
          />
          <textarea
            onChange={this.handleOnChange}
            className='message'
            value={this.state.message}
            name='message'
            title='message'
            placeholder='Message'
          />
          <br />
          <button
            className='submit-form'
            type='submit'
            color='info'
            sz='md'
            width='50%'
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
