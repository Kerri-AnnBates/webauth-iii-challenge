const express = require('express');
const router = express.Router();
const User = require('./user-model');
const restricted = require('../auth/restricted-middleware');
const checkDepartment = require('../auth/department-middleware');

router.get('/', restricted, (req, res) => {
   User.getUsers()
      .then(users => {
         res.status(200).json(users);
      })
      .catch(error => {
         res.status(500).json({message: 'Problems retrieving users'});
      });
});

module.exports = router;