const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', bodyParser.json({limit: '50mb'}));

// queries by pokemon type: Normal, Fire, Water, Grass, Flying, Fighting, Poison, Electric, Ground, Rock, Psychic, Ice, Bug, Ghost, Steel, Dragon, Dark and Fairy
// types endpoint : GET
// https://pokeapi.co/api/v2/type/{id or name}/
// query for shinies - sprites: front_shiny (png)

app.get('/api/pokemon/type/:type', (req, res) => {
  const { type } = req.params;
  axios(`https://pokeapi.co/api/v2/type/${type}`)
    .then(list => { res.status(200).send(list.data) })
    .catch(err => { res.status(400).send(err) });
});

app.get('/api/pokemon/name/:name', (req, res) => {
  const { name } = req.params;
  axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(list => res.status(200).send(list.data))
    .catch(err => res.status(400).send(err));
});

app.use('/', express.static(path.join(__dirname, '/../client/dist')));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});