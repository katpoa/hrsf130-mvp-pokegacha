import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { types, randomize } from '../../../reusable.js';
import List from './List.jsx';
import Form from './Form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starter: '',
      normal: [],
      fighting: [],
      flying: [],
      poison: [],
      ground: [],
      rock: [],
      bug: [],
      ghost: [],
      steel: [],
      fire: [],
      water: [],
      grass: [],
      electric: [],
      psychic: [],
      ice: [],
      dragon: [],
      dark: [],
      fairy: [],
      list: ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'],
      types: null,
      images: null
    };
    this.getAll = this.getAll.bind(this);
    this.getType = this.getType.bind(this);
    this.allTypes = this.allTypes.bind(this);
    this.getTypes = this.getTypes.bind(this);
    this.getImages = this.getImages.bind(this);
    this.getStarter = this.getStarter.bind(this);
  }

  componentDidMount() {
    this.getAll();
    // this.getTypes();
  }

  getAll() {
    for(let i = 1; i <= 18; i++) {
      this.getType(i);
    }
  }

  getType(id) {
    const { list } = this.state;
    axios(`/api/pokemon/type/${id}/`)
      .then(results => this.setState({
        [list[id - 1]]: results.data
      }, () => {
        if (id === 18) {
          this.allTypes();
        }
      }))
      .catch(err => console.log(err));
  }

  allTypes() {
    const { normal, fighting, flying, poison, ground, rock, bug, ghost, steel, fire, water, grass, electric, psychic, ice, dragon, dark, fairy } = this.state;
    const types = [ normal, fighting, flying, poison, ground, rock, bug, ghost, steel, fire, water, grass, electric, psychic, ice, dragon, dark, fairy ];
    this.setState({
      types: types
    }, this.getImages);
  }

  getTypes() {
    const { list } = this.state;
    let types = [];
    for(let i = 0; i < 18; i++) {
      let type = list[i];
      console.log(type)
      axios(`/api/pokemon/type/${type}/`)
        .then(results => {
          types.push( [results.data] );
        })
        .catch(err => console.log(err));
    }
    this.setState({
      types: types
    }, this.getImages);
  }

  getImages() {
    const { types } = this.state;
    // types.forEach(item => console.log(item));
    // types.forEach(type => {
    for(let i = 0; i < 18; i++) {
      console.log(types[i]);
      this.getImage(types[i].pokemon[0].pokemon.url)
    }
  }

  getImage(url) {
    let images = [];
    axios(`${url}`)
      .then(list => {
        console.log(list.data.sprites.other['official-artwork'].front_default);
        images.push(list.data.sprites.other['official-artwork'].front_default)
        this.setState({
          images: images
        })
      })
      .catch(err => console.log(err));
  }

  getStarter(name) {
    axios.get(`/api/pokemon/name/${name}`)
      .then(list => {
        this.setState({
          starter: list.data.sprites.other['official-artwork'].front_default
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const { starter, types, images } = this.state;
    const chosen = starter
      ? <img src={starter} />
      : <div></div>;
    const list = types !== null && images !== null
      ? <List types={types} images={images} />
      : <h1>Loading...</h1>;
    return (
      <div>
        <Form getStarter={this.getStarter} />
        {chosen}
        {list}
      </div>
    );
  }

}

export default App;