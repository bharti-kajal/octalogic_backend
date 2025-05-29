import express from 'express';
import connectToDatabase from './src/config/database.js';
const port = 3200;

const server = express();

server.listen(port, () => {
    console.log("Server is up and running on Port:", port);
    connectToDatabase();
});

