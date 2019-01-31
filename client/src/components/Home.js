import React, { Component } from 'react';

class Games extends Component {
  render() {
    return (
      <div className='games'>
        <div className='game-container'>
          <img
            className='game-picture'
            src='/images/american-player.jpg'
            alt='player'
          />
          <p className='game-details'>
            Date: Feb 1, 2019 <br />
            <br />
            Arena: Arena 1 <br />
            Address: 123 Fake Street <br />
            Start Time: 10:00 PM <br />
            End Time: 11:15 PM <br />
            Number of Players: 5 <br />
            Skill: Beginner <br />
            <br />
            <br />
            <a href='/' className='book-game-button'>
              Book Game
            </a>
          </p>
        </div>
        <div className='game-container'>
          <img
            className='game-picture'
            src='/images/american-player.jpg'
            alt='player'
          />
          <p className='game-details'>
            Date: Feb 1, 2019 <br />
            <br />
            Arena: Arena 1 <br />
            Address: 123 Fake Street <br />
            Start Time: 10:00 PM <br />
            End Time: 11:15 PM <br />
            Number of Players: 5 <br />
            Skill: Beginner <br />
            <br />
            <br />
            <a href='/' className='book-game-button'>
              Book Game
            </a>
          </p>
        </div>
        <div className='game-container'>
          <img
            className='game-picture'
            src='/images/american-player.jpg'
            alt='player'
          />
          <p className='game-details'>
            Date: Feb 1, 2019 <br />
            <br />
            Arena: Arena 1 <br />
            Address: 123 Fake Street <br />
            Start Time: 10:00 PM <br />
            End Time: 11:15 PM <br />
            Number of Players: 5 <br />
            Skill: Beginner <br />
            <br />
            <br />
            <a href='/' className='book-game-button'>
              Book Game
            </a>
          </p>
        </div>
        <div className='game-container'>
          <img
            className='game-picture'
            src='/images/american-player.jpg'
            alt='player'
          />
          <p className='game-details'>
            Date: Feb 1, 2019 <br />
            <br />
            Arena: Arena 1 <br />
            Address: 123 Fake Street <br />
            Start Time: 10:00 PM <br />
            End Time: 11:15 PM <br />
            Number of Players: 5 <br />
            Skill: Beginner <br />
            <br />
            <br />
            <a href='/' className='book-game-button'>
              Book Game
            </a>
          </p>
        </div>
      </div>
    );
  }
}

class UpcomingGames extends Component {
  render() {
    return (
      <div className='upcoming-games'>
        <h2>Upcoming Games</h2>
        <Games />
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <div className='home-welcome'>
          <div className='box business-description'>
            Book a Drop In Shinny In Vancouver
            <br />
            <div className='welcome-button'>View Games Now</div>
          </div>
          <div className='box login'>Add Login here</div>
        </div>
        <UpcomingGames />
      </div>
    );
  }
}

export default Home;
