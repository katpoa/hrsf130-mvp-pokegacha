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