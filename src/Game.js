import React, { Component } from 'react';
import Header from './Header';
import Card from './Card';
import Footer from './Footer';
import './Game.css';

export default class Game extends Component {
  static defaultProps = {
    num_of_chars: 12,
  };

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      score: 0,
      bestScore: 0,
    };
    this.increment = this.increment.bind(this);
  }

  async componentDidMount() {
    const characters = [];
    const res = await fetch('https://rickandmortyapi.com/api');
    const data = await res.json();

    const charUrl = data.characters;
    const results = await this.fetchCharacters(charUrl);
    for (let i = 0; i < this.props.num_of_chars; i++) {
      const { id, name, image } = results[i];
      characters.push({ id, name, image });
    }
    this.shuffle(characters);
    this.setState({
      characters: characters,
    });
  }

  async fetchCharacters(url) {
    const data = await fetch(url);
    const charData = await data.json();

    return charData.results;
  }

  shuffle(arr) {
    let currentIndex = arr.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  }

  increment() {
    this.setState(st => ({
      score: st.score + 1,
    }));

    this.shuffle(this.state.characters);
  }

  render() {
    return (
      <>
        <Header score={this.state.score} bestScore={this.state.bestScore} />
        <div className='Game'>
          {this.state.characters.map(c => (
            <Card
              image={c.image}
              name={c.name}
              key={c.name}
              increment={this.increment}
            />
          ))}
        </div>
        <Footer />
      </>
    );
  }
}
