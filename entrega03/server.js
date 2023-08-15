import express from 'express';

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
})

const connectedServer = server.listen(3000, () => {
  console.log('Listening on port 3000');
})