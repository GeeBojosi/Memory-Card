import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <h1>Rick and Morty Memory Game</h1>
        <div className='Header-scoreboard'>
          <p>score: {this.props.score}</p>
          <p>Best score: {this.props.bestScore}</p>
        </div>
      </div>
    );
  }
}
