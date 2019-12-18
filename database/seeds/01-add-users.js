const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'yoshi', password: bcrypt.hashSync('play', 8)},
        { username: 'pepper', password: bcrypt.hashSync('sleep', 8)},
        { username: 'frodo', password: bcrypt.hashSync('ring', 8)}
      ]);
    });
};
