const express = require('express');
const router = express();
const User = require('./user-model');

router.get('/', (req, res) => {
   User.getUsers()
      .then(users => {
         res.status(200).json(users);
      })
      .catch(error => {
         res.status(500).json({message: 'Problems retrieving users'});
      });
});

module.exports = router;