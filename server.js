const express = require('express');
const dbRouter = require('./data/dbRouter.js');
const server = express();

server.use(express.json());
server.use('/api/posts',dbRouter)

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda API</h>
    <p>Welcome to the Lambda API</p>
  `);
});




module.exports = server;