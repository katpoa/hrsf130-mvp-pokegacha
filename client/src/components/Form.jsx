import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const Button = styled.button`
  border-radius: 12px;
  height: 20px;
  background: white;
`;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      value: value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { value } = this.state;
    const { getStarter, pokedex } = this.props;
    const name = value.toLowerCase();
    getStarter(name);
    axios.get(`/api/pokemon/name/${name}`)
      .then(list => pokedex(list.data.sprites.other['official-artwork'].front_default, name))
      .catch(err => console.log(err));
    alert('Click on your starter Pokémon to train/gain essence!')
  }

  render() {
    return (
      <Box>
        <form onSubmit={this.handleSubmit}>
          <label>
            Choose your starter Pokémon:
            <input
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Button onClick={this.handleSubmit}>I choose you!</Button>
          </label>
        </form>
      </Box>
    );
  }
}

export default Form;