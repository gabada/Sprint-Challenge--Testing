const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
  findById
};

async function insert(game) {
  const [id] = await db('vgames').insert(game);
  return db('vgames')
    .where({ id })
    .first();
}

function remove(id) {
  return db('vgames')
    .where({ id })
    .del();
}

function getAll() {
  return db('vgames');
}

async function findById(id) {
  const game = await db('vgames')
    .where({ id: id })
    .first();
  return game;
}
