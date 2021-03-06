const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../user/user-model');

// register user endpoint
router.post('/register', (req, res) => {
   const user = req.body;
   const hash = bcrypt.hashSync(user.password, 8); // hash password before storing
   user.password = hash;

   Users.add(user)
      .then(savedUser => {
         res.status(201).json(savedUser);
      })
      .catch(error => {
         res.status(500).json({ message: 'Problem adding user' });
      });
});

router.post('/login', (req, res) => {
   const { username, password } = req.body;
   
   if (username && password) {
      // find user by username.
      Users.findBy(username)
         .then(user => {
            //if password match send back data
            if (user && bcrypt.compareSync(password, user.password)) {
               const token = signToken(user);
               
               res.status(200).json({
                  token,
                   message: `Welcome ${username}` 
                  });
            } else {
               res.status(401).json({ message: 'You shall not pass!' });
            }
         })
         .catch(error => {
            res.status(500).json({ message: 'Problems loggin you in.'});
         })
   } else {
      res.status(400).json({ message: 'Please provide a username and password' });
   }
})

function signToken(user) {
   const payload = {
      id: user.id
   }

   const secret = process.env.JWT_SECRET;

   const options = {
      expiresIn: '1hr'
   }

   return jwt.sign(payload, secret, options);
}

module.exports = router;