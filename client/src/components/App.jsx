import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import List from './List.jsx';
import Form from './Form.jsx';

const Body = styled.div`
font-family: 'Inconsolata', monospace;
font-family: 'Montserrat', sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Logo = styled.img`
  margin-left: 10%;
  width: 150px;
`;

const Starter = styled.div`
  display: block;
  margin: auto;
  size: 350px;
  // background-image: url('https://miscellaneous-projects.s3-us-west-1.amazonaws.com/pokeball.jpg');
  // opacity: 0.6;
`;

const Currency = styled.div`
  display: block;
  justify-content: center;
  margin: auto;
  width: 100px;
  border-radius: 15px;
  border: 2px dotted #f7d848;
  text-align: center;
`;

const Img = styled.img`
  width: 300px;
  display: block;
  margin: auto;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starter: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
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
      currency: 0
    };
    this.getAll = this.getAll.bind(this);
    this.getType = this.getType.bind(this);
    this.allTypes = this.allTypes.bind(this);
    // this.getTypes = this.getTypes.bind(this);
    // this.getImages = this.getImages.bind(this);
    this.getStarter = this.getStarter.bind(this);
    this.addEssence = this.addEssence.bind(this);
    this.spendEssence = this.spendEssence.bind(this);
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
    });
  }

  // getTypes() {
  //   const { list } = this.state;
  //   let types = [];
  //   for(let i = 0; i < 18; i++) {
  //     let type = list[i];
  //     console.log(type)
  //     axios(`/api/pokemon/type/${type}/`)
  //       .then(results => {
  //         types.push( [results.data] );
  //       })
  //       .catch(err => console.log(err));
  //   }
  //   this.setState({
  //     types: types
  //   }, this.getImages);
  // }

  // getImages() {
  //   const { types } = this.state;
  //   // types.forEach(item => console.log(item));
  //   // types.forEach(type => {
  //   for(let i = 0; i < 18; i++) {
  //     console.log(types[i]);
  //     setTimeout(() => this.getImage(types[i].pokemon[0].pokemon.url), 150);
  //   }
  // }

  // getImage(url) {
  //   const { images } = this.state;
  //   axios(`${url}`)
  //     .then(list => {
  //       images.push(list.data.sprites.other['official-artwork'].front_default)
  //       console.log(images);
  //       this.setState({
  //         images: images
  //       })
  //     })
  //     .catch(err => console.log(err));
  // }

  getStarter(name) {
    axios.get(`/api/pokemon/name/${name}`)
      .then(list => {
        this.setState({
          starter: list.data.sprites.front_default
        })
      })
      .catch(err => console.log(err));
  }

  addEssence(e) {
    e.preventDefault();
    const { currency } = this.state;
    this.setState({
      currency: currency + 3
    })
  }

  spendEssence() {
    const { currency } = this.state;
    this.setState({
      currency: currency - 5
    })
  }

  render() {
    const { starter, types, currency } = this.state;
    const chosen = starter
      ? <Img src={starter} onClick={this.addEssence} />
      : <div/>;
    const list = types !== null && types.length === 18
      ? <List types={types} currency={currency} spendEssence={this.spendEssence} />
      : <h1>Loading...</h1>;
    return (
      <Body>
        <Header>
        <h2>Gotta catch 'em all!</h2>
          <Logo src="https://miscellaneous-projects.s3-us-west-1.amazonaws.com/logo.png" />
          <Form getStarter={this.getStarter} />
        </Header>
        <div>
          <Starter>
            <Currency>{currency} essence</Currency>
            {chosen}
          </Starter>
          <div>
            <h2>Unlimited Availability Banners</h2>
            {list}
          </div>
        </div>
      </Body>
    );
  }
}

export default App;