import express from 'express';
const port = 3200;

const server = express();

server.listen(port, () => {
    console.log("Server is up and running on Port:", port);
});

