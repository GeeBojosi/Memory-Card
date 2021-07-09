import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  render() {
    const { score, highScore } = this.props;
    return (
      <div className='Header'>
        <h1>Rick and Morty Memory Game</h1>
        <div className='Header-scoreboard'>
          <p>score: {score}</p>
          <p>High score: {highScore}</p>
        </div>
      </div>
    );
  }
}
