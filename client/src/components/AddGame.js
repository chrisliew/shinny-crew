import React from 'react';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arena: 'Select Arena',
      address: 'Select Address',
      price: 18,
      startDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      endDate: new Date(),
      forwardSlots: 18,
      defenseSlots: 8,
      goalieSlots: 2,
      skill: 'Beginner',
      password: ''
    };
  }

  handleOnChangeArena = arena => {
    this.setState({
      arena: arena.value
    });
  };

  handleOnChangeAddress = address => {
    this.setState({
      address: address.value
    });
  };

  handleOnChangePrice = price => {
    this.setState({
      price: price.value
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

  handleOnChangeForwardSlots = forwardSlots => {
    this.setState({
      forwardSlots: forwardSlots.value
    });
  };

  handleOnChangeDefenseSlots = defenseSlots => {
    this.setState({
      defenseSlots: defenseSlots.value
    });
  };

  handleOnChangeGoalieSlots = goalieSlots => {
    this.setState({
      goalieSlots: goalieSlots.value
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
    alert('You have added this game');
  };

  render() {
    const arenaOptions = ['Killarney Rink', 'Sunset Arena', 'Trout Lake Rink'];
    const addresses = [
      '6260 Killarney St, Vancouver, BC',
      '390 E 51st Ave, Vancouver, BC',
      '3360 Victoria Dr, Vancouver, BC'
    ];
    const prices = [
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25
    ];
    const forwardSlotsOptions = [
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24
    ];
    const defenseSlotsOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const goalieSlotsOptions = [1, 2, 3, 4];
    const skillOptions = ['Beginner', 'Intermediate', 'Advanced'];

    return (
      <div className='add-game'>
        <div className='add-game-child'>
          <h3>Arena</h3>
          <Dropdown
            options={arenaOptions}
            onChange={this.handleOnChangeArena}
            placeholder={this.state.arena}
          />
        </div>

        <div className='add-game-child'>
          <h3>Address</h3>
          <Dropdown
            options={addresses}
            onChange={this.handleOnChangeAddress}
            placeholder={this.state.address}
          />
        </div>

        <div className='add-game-child'>
          <h3>Price</h3>
          <Dropdown
            options={prices}
            onChange={this.handleOnChangePrice}
            placeholder={this.state.price}
          />
        </div>

        <div className='add-game-child'>
          <h3>Start Date</h3>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleStartDateChange}
          />
        </div>

        <div className='add-game-child'>
          <h3>Start Time</h3>
          <DatePicker
            selected={this.state.startTime}
            onChange={this.handleStartTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={5}
            dateFormat='h:mm aa'
            timeCaption='Time'
          />
        </div>

        <div className='add-game-child'>
          <h3>End Date</h3>
          <DatePicker
            selected={this.state.endDate}
            onChange={this.handleEndDateChange}
          />
        </div>

        <div className='add-game-child'>
          <h3>End Time</h3>
          <DatePicker
            selected={this.state.endTime}
            onChange={this.handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={5}
            dateFormat='h:mm aa'
            timeCaption='Time'
          />
        </div>
        <br />
        <div className='add-game-child'>
          <h3>Forward Slots</h3>
          <Dropdown
            options={forwardSlotsOptions}
            onChange={this.handleOnChangeForwardSlots}
            placeholder={this.state.forwardSlots}
          />
        </div>

        <div className='add-game-child'>
          <h3>Defense Slots</h3>
          <Dropdown
            options={defenseSlotsOptions}
            onChange={this.handleOnChangeDefenseSlots}
            placeholder={this.state.defenseSlots}
          />
        </div>

        <div className='add-game-child'>
          <h3>Goalie Slots</h3>
          <Dropdown
            options={goalieSlotsOptions}
            onChange={this.handleOnChangeGoalieSlots}
            placeholder={this.state.goalieSlots}
          />
        </div>

        <div className='add-game-child'>
          <h3>Skill</h3>
          <Dropdown
            options={skillOptions}
            onChange={this.handleOnChangeSkill}
            placeholder={this.state.skill}
          />
        </div>

        <div className='add-game-child'>
          <h3>Password</h3>
          <input
            type='password'
            name='password'
            onChange={this.handleOnChangePassword}
          />
        </div>
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
