import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Img = styled.img`
  size: contain;
  width: 100vw;
`;

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      name: '',
    };
  }

  reRoll() {

  }

  render() {
    const { name, list, image } = this.props;
    console.log(image);
    return (
      <div>
        <h3>{name}</h3>
        <Img src={image} />
      </div>
    );
  }

}

export default Banner;