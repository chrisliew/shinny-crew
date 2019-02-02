import React from 'react';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arena: 'Select arena',
      startDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      endDate: new Date(),
      slots: 20,
      skill: 'Beginner',
      password: ''
    };
  }

  handleOnChangeArena = arena => {
    this.setState({
      arena: arena.value
    });
  };

  handleStartDateChange = startDate => {
    this.setState({
      startDate: startDate,
      endDate: startDate
    });
  };

  handleEndDateChange = endDate => {
    this.setState({
      endDate: endDate
    });
  };

  handleStartTimeChange = time => {
    this.setState({
      startTime: time,
      endTime: time
    });
  };

  handleEndTimeChange = time => {
    this.setState({
      endTime: time
    });
  };

  handleOnChangeSlots = slots => {
    this.setState({
      slots: slots.value
    });
  };

  handleOnChangeSkill = skill => {
    this.setState({
      skill: skill.value
    });
  };

  handleOnChangePassword = password => {
    this.setState({
      password: password.target.value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.addGameRequest(this.state);
  };

  render() {
    const arenaOptions = ['Arena 1', 'Arena 2', 'Arena 3', 'Arena 4'];
    const slotsOptions = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const skillOptions = ['Beginner', 'Intermediate', 'Advanced'];

    return (
      <div className='add-game'>
        <h3>Select Arena</h3>
        <Dropdown
          options={arenaOptions}
          onChange={this.handleOnChangeArena}
          placeholder={this.state.arena}
        />
        <h3>Select Start Date</h3>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleStartDateChange}
        />
        <h3>Select Start Time</h3>
        <DatePicker
          selected={this.state.startTime}
          onChange={this.handleStartTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5}
          dateFormat='h:mm aa'
          timeCaption='Time'
        />
        <h3>Select End Date</h3>
        <DatePicker
          selected={this.state.endDate}
          onChange={this.handleEndDateChange}
        />
        <h3>Select End Time</h3>
        <DatePicker
          selected={this.state.endTime}
          onChange={this.handleEndTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5}
          dateFormat='h:mm aa'
          timeCaption='Time'
        />
        <h3>Select Slots</h3>
        <Dropdown
          options={slotsOptions}
          onChange={this.handleOnChangeSlots}
          placeholder={this.state.slots}
        />
        <h3>Select Skill</h3>
        <Dropdown
          options={skillOptions}
          onChange={this.handleOnChangeSkill}
          placeholder={this.state.skill}
        />
        <h3>Password</h3>
        <input
          type='password'
          name='password'
          onChange={this.handleOnChangePassword}
        />
        <button className='book-game-button' onClick={this.handleOnSubmit}>
          Add Game
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(AddGame);
