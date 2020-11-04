const types = ['Normal', 'Fire', 'Water', 'Grass', 'Flying', 'Fighting', 'Poison', 'Electric', 'Ground', 'Rock', 'Psychic', 'Ice', 'Bug', 'Ghost', 'Steel', 'Dragon', 'Dark', 'Fairy'];

const randomize = (max, min) => Math.floor * (Math.random() * (max - min) + min);

module.exports = {
  types: types,
  randomize: randomize,
};