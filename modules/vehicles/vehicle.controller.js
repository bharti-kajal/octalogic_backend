import db from "../../models/index.js";
class VehicleController {

  //1. Fetch Vehicle Types From DB
  async vehicleTypes(req, res) {
    try {
      const wheelType = req.params.type;
      const types = await db.VehicleTypes.findAll({
        attributes: ["id", "name", "category"],
        where: {
          category: wheelType
        }
      });
      res.status(200).json({
        success: true,
        data: types
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
          vehicle_type_id: vehicleTypeId
        }
      });
      res.status(200).json({
        success: true,
        data: vehicles
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
    // 1. Check required fields
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

    // 2. Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(start_date) || !dateRegex.test(end_date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    // 3. Check if start_date is before end_date
    if (new Date(start_date) >= new Date(end_date)) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // 4. Check if vehicle exists
    
    const vehicle = await db.Vehicles.findOne({
      where: { id: vehicle_id},
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found or does not match the type",
      });
    }

    // 5. Check if vehicle is already booked for the given dates
    const existingBooking = await db.Bookings.findOne({
      where: {
        vehicle_id,
        [db.Sequelize.Op.or]: [
          {
            start_date: { [db.Sequelize.Op.between]: [start_date, end_date] },
          },
          {
            end_date: { [db.Sequelize.Op.between]: [start_date, end_date] },
          },
        ],
      },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "Vehicle is already booked for the selected dates",
      });
    }

    // === CREATE BOOKING ===
    const newBooking = await db.Bookings.create({
      vehicle_id,
      first_name,
      last_name,
      no_of_wheel,
      start_date,
      end_date
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
