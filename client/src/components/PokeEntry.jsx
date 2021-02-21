import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Img = styled.img`
  object-fit: contain;
  max-width: 150px;
  max-height: 150px;
  border-radius: 4px;
  white-space: nowrap;
`;

class PokeEntry extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      edit: false,
      pokename: '',
      nickname: ''
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.giveNickname = this.giveNickname.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.name) {
      this.setState({
        pokename: this.props.name
      })
    }
  }

  handleEdit(e) {
    e.preventDefault();
    const { edit } = this.state;
    this.setState({
      edit: !edit 
    });
  }

  giveNickname(e) {
    e.preventDefault();
    const { editName } = this.props;
    const { value, pokename, nickname } = this.state;
    editName(pokename, value);
    // change nickname to submitted value
    this.handleEdit(e);
    this.setState({
      nickname: value
    })
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      value: value
    })
  }

  render() {
    const { edit } = this.state;
    const { name, image } = this.props;
    const { pokename, nickname } = this.state;
    const nameBox = nickname 
      ? nickname
      : name;
    const textBox = edit
      ? <form onSubmit={this.giveNickname}>
        <input 
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.giveNickname}>
          save
          </button>
      </form>
      : <div onClick={this.handleEdit}>
          {nameBox}
        </div>
    const imageUrl = image
      ? <Img alt="icon" src={image} />
      : <h3>Loading...</h3>;
    return(
      <Row>
        {textBox}
        {imageUrl}
      </Row>
    );
  }
};

export default PokeEntry;