import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import List from './List.jsx';
import Form from './Form.jsx';
import PokeModal from './PokeModal.jsx';

const Body = styled.div`
  font-family: 'Inconsolata', monospace;
  font-family: 'Montserrat', sans-serif;
  margin: 20px;
  position: relative;
  background-image: url('https://miscellaneous-projects.s3-us-west-1.amazonaws.com/wallpaper.jpg');
  background-repeat: repeat-y;
  background-attachment: fixed;
  background-size: cover;
  object-fit: contain;
`;

const Header = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  opacity: .9;
  margin-left: 30px;
`;

const Headers = styled.h2`
  padding: 15px;
  text-align: center;
  justify-content: center;
  margin-left: 10%;
  border-radius: 15px;
  border: 2px solid white;
  background: white;
  opacity: .9;
  max-width: 400px;
  max-height: 600px;
`;

const Logo = styled.img`
  display: flex;
  margin-left: 100px;
  margin-right: 100px;
  width: 200px;
`;

const Starter = styled.div`
  display: block;
  margin-left: 50px;
  margin-right: 50px;
  size: 200px;
  border-radius: 50px;
  border: 5px dotted #f7d848;
`;

const Currency = styled.div`
  display: block;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
  padding: 5px;
  background: white;
  opacity: .95;
  width: 100px;
  border-radius: 15px;
  border: 2px dotted #f7d848;
  text-align: center;
`;

const Img = styled.img`
  width: 400px;
  display: flex;
  margin: auto;
`;

const Main = styled.div`
  display: block;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 50px;
  border: 3px dotted #f7d848;
  max-width: 400px;
  justify-content: space-between;
  background-color: white;
`;

const Button = styled.button`
  border-radius: 12px;
  height: 35px;
  background: #FFEFAC;
  margin-left: 10%;
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
      currency: 0,
      box: [],
      modal: false
    };
    this.getAll = this.getAll.bind(this);
    this.getType = this.getType.bind(this);
    this.allTypes = this.allTypes.bind(this);
    // this.getTypes = this.getTypes.bind(this);
    // this.getImages = this.getImages.bind(this);
    this.getStarter = this.getStarter.bind(this);
    this.addEssence = this.addEssence.bind(this);
    this.spendEssence = this.spendEssence.bind(this);
    this.pokedex = this.pokedex.bind(this);
    this.pokeModal = this.pokeModal.bind(this);
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

  getStarter(name) {
    axios.get(`/api/pokemon/name/${name}`)
      .then(list => {
        this.setState({
          starter: list.data.sprites.other['official-artwork'].front_default
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

  pokedex(image, name) {
    const { box } = this.state;
    box.push({name: name, image: image});
    // just have duplicates for now bc no easy delete from array
    this.setState({
      box: box
    })
  }

  pokeModal(e) {
    e.preventDefault();
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  }

  render() {
    const { starter, types, currency, box, modal } = this.state;
    const chosen = starter
      ? <Img src={starter} onClick={this.addEssence} />
      : <div/>;
    const list = types !== null && types.length === 18
      ? <List types={types} currency={currency} spendEssence={this.spendEssence} pokedex={this.pokedex} />
      : <h1>Loading...</h1>;
    const modalPop = modal
      ? (<PokeModal
          key={currency}
          box={box}
          pokedex={this.pokedex}
          handleClose={this.pokeModal}
        />)
      : <div />;
    return (
      <Body>
        {modalPop}
        <Header>
          <Headers>Gotta catch 'em all!</Headers>
          <Logo src="https://miscellaneous-projects.s3-us-west-1.amazonaws.com/logo.png" />
          <Form getStarter={this.getStarter} pokedex={this.pokedex} />
        </Header>
        <div>
          <Starter>
            <Currency>{currency} essence</Currency>
            <Main>
              {chosen}
            </Main>
          </Starter>
          <div>
            <Button onClick={this.pokeModal}>
              See Pokedex ->
            </Button>
          </div>
          <div>
            <Headers>Unlimited Availability Banners</Headers>
            {list}
          </div>
        </div>
      </Body>
    );
  }
}

export default App;