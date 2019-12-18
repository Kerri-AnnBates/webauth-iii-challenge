const express = require('express');

const server = express();
const userRouters = require('../user/user-router');
const authRouters = require('../auth/auth-router');

server.use(express.json());
server.use('/api/users', userRouters);
server.use('/api', authRouters);

server.get('/', (req, res) => {
   res.send(`It's alive!`);
});

module.exports = server;