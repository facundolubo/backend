import express from 'express';

const server = express();

const connectedServer = server.listen(3000, () => {
  console.log('Listening on port 3000');
})