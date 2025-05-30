import express from 'express';
import VehicleController from './vehicle.controller.js';

const vehicleController = new VehicleController();
const router = express.Router();

//1. Vehicle Types
router.get("/vehicle-types/:type", (req, res) => {
    vehicleController.vehicleTypes(req, res);
});

//2. Vehicle Lists
router.get("/vehicles/:vehicleTypeId", (req, res) => {
    vehicleController.vehicle(req, res);
});

// 3. Book Vehicles
router.post("/booking", (req, res) => {
    vehicleController.booking(req, res);
});

export default router;

