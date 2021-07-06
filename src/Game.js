import React, { Component } from 'react'

export default class Game extends Component {
  static defaultProps = {
    num_of_chars: 12
  }

  constructor(props) {
    super(props);
    this.state = {
      
    }
    console.log("INSIDE CONSTRUCTOR");
  }

  async componentDidMount() {
    console.log("INSIDE COMPONENT DID MOUNT");
    const characters = [];
    const res = await fetch("https://rickandmortyapi.com/api");
    const data = await res.json();

    const charUrl = data.characters;
    const results = await this.fetchCharacters(charUrl);
    for(let i = 0; i < this.props.num_of_chars; i++) {
      characters.push(results[i]);
    }
    console.log(characters)
  }

  async fetchCharacters(url) {
    const data = await fetch(url);
    const charData = await data.json();
    
    return charData.results;
  }

  render() {
    console.log("INSIDE RENDER");
    return (
      <div className="Game">
        <h1>Memory Game</h1>
      </div>
    )
  };
};
