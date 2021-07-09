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
      highScore: 0,
      clickeId: [],
      loading: true,
    };
    this.handleScore = this.handleScore.bind(this);
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
      loading: false,
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

  handleScore(id) {
    const { clickeId, characters } = this.state;
    if (clickeId.length === 0 || !clickeId.includes(id)) {
      this.increment();
      this.state.clickeId.push(id);
      this.setState(st => ({
        clickeId: [...st.clickeId],
      }));
    } else if (clickeId.includes(id)) {
      alert('Game over click OK to start');
      this.setState(st => ({
        score: 0,
        highScore: st.score + st.highScore,
        clickeId: [],
      }));
    } else if (clickeId.length === characters.length) {
      alert('Congratulation you win!');
    }
  }

  increment() {
    this.setState(st => ({
      score: st.score + 1,
    }));
    this.shuffle(this.state.characters);
  }

  render() {
    const { score, highScore, characters, loading } = this.state;

    if (loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    return (
      <>
        <Header score={score} highScore={highScore} />
        <div className='Game'>
          {characters.map(c => (
            <Card
              id={c.id}
              image={c.image}
              name={c.name}
              key={c.name}
              handleScoring={this.handleScore}
            />
          ))}
        </div>
        <Footer />
      </>
    );
  }
}
