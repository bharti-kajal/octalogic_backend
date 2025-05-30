import db from "../../models/index.js";
import dayjs from 'dayjs';

class VehicleController {
  //1. Fetch Vehicle Types From DB
  async vehicleTypes(req, res) {
    try {
      const wheelType = req.params.type;
      const types = await db.VehicleTypes.findAll({
        attributes: ["id", "name", "category"],
        where: {
          category: wheelType,
        },
      });
      res.status(200).json({
        success: true,
        data: types,
      });
    } catch (err) {
      console.error("Error in Controller", err);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

  //2. Fetch Vehicle Lists from DB
  async vehicle(req, res) {
    try {
      const vehicleTypeId = req.params.vehicleTypeId;
      const vehicles = await db.Vehicles.findAll({
        attributes: ["id", "name"],
        where: {
          vehicle_type_id: vehicleTypeId,
        },
      });
      res.status(200).json({
        success: true,
        data: vehicles,
      });
    } catch (err) {
      console.error("Error in Controller", err);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

  //3. Vehicles Booking
  async booking(req, res) {
    try {
          const {
        vehicle_id,
        first_name,
        last_name,
        no_of_wheel,
        start_date,
        end_date,
      } = req.body;

      // === VALIDATIONS ===
      if (
        !vehicle_id ||
        !first_name ||
        !last_name ||
        !no_of_wheel ||
        !start_date ||
        !end_date
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const formattedStartDate = dayjs(start_date).format("YYYY-MM-DD");
      const formattedEndDate = dayjs(end_date).format("YYYY-MM-DD");

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formattedStartDate) || !dateRegex.test(formattedEndDate)) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format. Use YYYY-MM-DD",
        });
      }

      if (new Date(formattedStartDate) >= new Date(formattedEndDate)) {
        return res.status(400).json({
          success: false,
          message: "End date must be after start date",
        });
      }

      // === VEHICLE EXISTENCE CHECK ===
      const vehicle = await db.Vehicles.findOne({
        where: { id: vehicle_id },
      });

      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        });
      }

      // === OVERLAP CHECK ===
      const { Op } = db.Sequelize;
      const overlappingBooking = await db.Bookings.findOne({
        where: {
          vehicle_id,
          [Op.or]: [
            {
              start_date: {
                [Op.lte]: formattedEndDate,
              },
              end_date: {
                [Op.gte]: formattedStartDate,
              },
            },
          ],
        },
      });

      if (overlappingBooking) {
        return res.status(409).json({
          success: false,
          message: "Vehicle is already booked for the selected date range",
        });
      }

      // === CREATE BOOKING ===
      const newBooking = await db.Bookings.create({
        vehicle_id,
        first_name,
        last_name,
        no_of_wheel,
        start_date:formattedStartDate,
        end_date:formattedEndDate
      });

      return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: newBooking,
      });
    } catch (err) {
      console.error("Error in booking controller:", err);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
}

export default VehicleController;
