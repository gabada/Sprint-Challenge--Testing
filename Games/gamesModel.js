const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
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

async function update(id, changes) {
  return null;
}

function remove(id) {
  return db('vgames')
    .where({ id })
    .del();
}

function getAll() {
  return db('vgames');
}

function findById(id) {
  return null;
}
