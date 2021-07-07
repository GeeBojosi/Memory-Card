import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.increment();
  }
  render() {
    return (
      <div className='Card' onClick={this.handleClick}>
        <img src={this.props.image} alt={this.props.name} />
        <p>{this.props.name}</p>
      </div>
    );
  }
}
