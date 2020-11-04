import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Img = styled.img`
  object-fit: contain;
  max-width: 64px;
  max-height: 64px;
  border-radius: 4px;
`;

const PokeEntry = ({name, image}) => {
  const imageUrl = image
      ? <Img alt="icon" src={image} />
      : <h3>Loading...</h3>;
  return(
    <Row>
      <div>
        {name}
      </div>
      {imageUrl}
    </Row>
  );
};

export default PokeEntry;