const db = require('../database/dbConfig');

module.exports = {
   getUsers,
   findById
}

function getUsers() {
   return db('users');
}

function findById(id) {
   return db('users')
      .where({ id })
      .first();
}