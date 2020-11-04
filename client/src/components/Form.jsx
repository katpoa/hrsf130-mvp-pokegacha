import React from 'react';
import axios from 'axios';
import styled from 'styled-components';


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
    const { getStarter } = this.props;
    getStarter(value.toLowerCase());
  }

  render() {
    // const { image } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Choose your starter Pokémon:
            <input
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>I choose you!</button>
          </label>
        </form>
      </div>
    );
  }

}

export default Form;