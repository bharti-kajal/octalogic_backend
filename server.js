import express from 'express';
import router from './modules/vehicles/vehicle.routes.js';
import cors from 'cors';
import { connectToDB } from './models/index.js';
const port = 3200;
const server = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
};

// Apply CORS middleware before routes
server.use(cors(corsOptions));

server.use(express.json());

// Router Middleware
server.use("/api", router);

// 404 Middleware for APIs that don't exist
server.use("/api", (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

// Listen Server on port
server.listen(port, () => {
    console.log("Server is up and running on Port:", port);
    connectToDB();
});
