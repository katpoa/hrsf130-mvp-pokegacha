import React from 'react';
import styled from 'styled-components';
import Banner from './Banner.jsx';

const Banners = styled.div`
  border: 1px dotted linear-gradient(115deg,#a8f1ba,#f3e4a6,#c09ae7,#95dbf7,#8be9b0);
`;

const List = ({types, images}) => (
  <Banners>
    { types.forEach((type, index) => (
      <Banner key={type.id} name={type.name} list={type.pokemon} image={images[index]} />
    ))}
  </Banners>
);

export default List;