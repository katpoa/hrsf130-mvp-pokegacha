import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const randomize = (max, min) => min + Math.floor(Math.random() * (max - min));

const Item = styled.div`
  margin: auto;
  margin: 20px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid grey;
`;

const Button = styled.button`
  border-radius: 10px;
  background: linear-gradient(115deg,#a8f1ba,#f3e4a6,#c09ae7,#95dbf7,#8be9b0);
  height: 50px;
  margin: 50px;
`;

const Pokemon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Img = styled.img`
  display: block;
  margin: auto;
  width: 200px;
`;

class Type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      name: ''
    };
    this.reRoll = this.reRoll.bind(this);
  }

  reRoll(e) {
    e.preventDefault();
    const { list, currency, spendEssence } = this.props;
    if (currency < 5) {
      // otherwise, alert: not enough essence!
      alert('Not enough essence! Keep training your starter to gain more essence!');
    } else {
      // call currency decrement -5
      spendEssence();
      const imageUrl = list[randomize(list.length, 0)].pokemon.url;

      axios(`${imageUrl}`)
      .then(results => {
        // 1% chance to roll a shiny!
        const artwork = randomize(100, 0) < 1
        ? results.data.sprites.front_shiny
        : results.data.sprites.other['official-artwork'].front_default == null
          ? results.data.sprites.front_default
          : results.data.sprites.other['official-artwork'].front_default;
        this.setState({
          // image: results.data.sprites.other['official-artwork'].front_default,
          image: artwork,
          name: results.data.name
        });
      })
      .catch(err => console.log(err));
    }
  }

  render() {
    const { type } = this.props;
    const { image, name } = this.state;
    return (
      <Item>
        <Box>
          <h3>{type}</h3>
          <Button onClick={this.reRoll}>
            <strong>Try your luck!</strong><br/>(-5 essence)
          </Button>
          <Pokemon>
            <Img src={image} />
            <h3>{name}</h3>
          </Pokemon>
        </Box>
      </Item>
    );
  }
}

export default Type;