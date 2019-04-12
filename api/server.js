const express = require('express');

const server = express();
const Games = require('../Games/gamesModel.js');

server.use(express.json());

server.get('/games', async (req, res) => {
  try {
    const games = await Games.getAll();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
