import React from 'react';
import styled from 'styled-components';
import PokeEntry from './PokeEntry.jsx';

const Page = styled.div`
  padding: 40px;
  align-items: center;
  z-index: 2000;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  max-height: 100%;
  background: rgba(34, 34, 34, .6);
  overflow-y: scroll;
  white-space: nowrap;
  animation-duration: 1s;
  animation-name: x;
  @keyframes x {
    from {
      opacity: 0%;
    }
    to {
      opacity: 100%;
    }
  }
`;

const Modal = styled.div`
  z-index: 200;
  width: 100%;
  max-width: 568px;
  border-radius: 12px;
  background: rgb(255, 255, 255);
  position: relative;
  overflow-y: scroll;
  display: flex;
  margin: auto;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  animation-duration: 1s;
  animation-name: slidein;
  justify-content: center;
  @keyframes slidein {
    from {
      margin-top: 100%;
      opacity: 0%;
    }
    to {
      margin-top: 0%;
      opacity: 100%;
    }
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0px;
  border-bottom: 1px solid rgb(235, 235, 235);
`;

const Button = styled.button`
  appearance: none;
  justify-content: left;

  position: sticky;
  top: 16px;
  margin-left: 24px;

  border-radius: 50%;
  border: none;
  outline: none;
  top: 0px;
  padding: 7px;
  color: rgb(34, 34, 34);
  cursor: pointer;
  touch-action: manipulation;
  opacity: .7;
  transition: -ms-transform 0.25s ease 0s, -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s;
}
`;

const Close = styled.svg`
  display: block;
  fill: none;
  height: 16px;
  width: 16px;
  stroke: currentcolor;
  stroke-width: 3;
  overflow: visible;
`;

const Title = styled.header`
  -webkit-box-pack: justify;
  min-height: 48px;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  padding: 0px 24px;
  color: rgb(34, 34, 34);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
`;

const HeaderTitle = styled.div`
  font-weight: bold;
  -webkit-box-flex: 0;
  // overflow: hidden;
  flex: 0 1 auto;
  text-align: center;
  margin: auto;
`;

const List = styled.div`
  margin-top: 20px;
  padding: 20px 16px;
  overflow-y: scroll;
  white-space: wrap;
`;

const PokeModal = ({ box, pokedex, handleClose, editName }) => (
  <Page>
    <Modal>
      <Header>
        <Button type="button" onClick={handleClose}>
          <Close viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
            <path d="m6 6 20 20" />
            <path d="m26 6-20 20" />
          </Close>
        </Button>
        <Title>
          <HeaderTitle>Pokedex Inventory</HeaderTitle>
        </Title>
      </Header>
      <div>
        <List>
          {box.map(pokemon => (
            <PokeEntry
              name={pokemon.name}
              image={pokemon.image}
              editName={editName}
            />
          ))}
            <div>
              {/* <Button onClick={pokedex}>
                <Close viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                  <path d="m6 6 20 20" />
                  <path d="m26 6-20 20" />
                </Close>
              </Button> */}
            </div>
        </List>
      </div>
    </Modal>
  </Page>
);

export default PokeModal;