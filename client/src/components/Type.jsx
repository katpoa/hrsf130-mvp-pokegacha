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

const Save = styled.div`

`;

const EmptyHeart = styled.button`
  position: relative;
  z-index: 1;
  background: transparent;
  height: 24px;
  svg {
    background: transparent;
    fill: rgba(0, 0, 0, 0.5);
    min-height: 24px;
    min-width: 24px;
  }
  justify-content: right;
  margin-right: 6px;
  margin-top: 7px;
  overflow: hidden;
  stroke: rgb(255, 255, 255);
  outline: none;
  border: none;
`;

const FilledHeart = styled.button`
  position: relative;
  z-index: 1;
  background: transparent;
  height: 24px;
  svg {
    background: transparent;
    fill: rgb(255, 56, 92);
    min-height: 24px;
    min-width: 24px;
  }
  justify-content: right;
  margin-right: 6px;
  margin-top: 7px;
  overflow: hidden;
  stroke: rgb(255, 255, 255);
  outline: none;
  border: none;
`;

class Type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      name: '',
      saved: false
    };
    this.reRoll = this.reRoll.bind(this);
    this.heartClick = this.heartClick.bind(this);
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

  heartClick(e) {
    e.preventDefault();
    const { image, name, saved } = this.state;
    const { pokedex } = this.props;
    // if heart is not filled when clicked, add to pokedex
    // else (heart is filled alr), change heart toggle to empty
    pokedex(image, name);
    this.setState({
      saved: !saved,
    });
  }

  render() {
    const { type } = this.props;
    const { image, name, saved } = this.state;
    const heart = saved ? (
      <FilledHeart type="button" onClick={this.heartClick}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></svg>
      </FilledHeart>
    ) : (
      <EmptyHeart type="button" onClick={this.heartClick}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></svg>
      </EmptyHeart>
    );
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
            <Save>
              {heart}
            </Save>
          </Pokemon>
        </Box>
      </Item>
    );
  }
}

export default Type;