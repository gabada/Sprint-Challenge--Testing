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

server.post('/games', async (req, res) => {
  const { title, genre } = req.body;
  if (!title || !genre) {
    return res.status(422).json({ error: 'Missing title or genre' });
  } else
    try {
      const game = await Games.insert(req.body);
      res.status(201).json(game);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        res.status(405).end();
      } else {
        res.status(500).json(error);
      }
    }
});

server.get('/games/:id', async (req, res) => {
  try {
    const game = await Games.findById(req.params.id);
    if (game === undefined) {
      res.status(404).end();
    } else {
      res.status(200).json(game);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.delete('/games/:id', async (req, res) => {
  try {
    const game = await Games.remove(req.params.id);
    if (!game) {
      res.status(404).end();
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
