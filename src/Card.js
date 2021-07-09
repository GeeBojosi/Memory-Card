import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleScoring(this.props.id);
  }
  render() {
    const { image, name } = this.props;
    return (
      <div className='Card' onClick={this.handleClick}>
        <img src={image} alt={name} />
        <p>{name}</p>
      </div>
    );
  }
}
