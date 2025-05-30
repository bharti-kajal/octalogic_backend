class VehicleController {

  //1. Fetch Vehicle Types From DB
  async vehicleTypes(req, res) {
    try {
      const types = await db.VehicleTypes.findAll({
        attributes: ["id", "name"],
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
      console.log("veghice");
    } catch (err) {
      console.log("Error in Controller", err);
    }
  }

  //3. Vehicles Booking
  async booking(req, res) {
    try {
      console.log("booking");
    } catch (err) {
      console.log("Error in Controller", err);
    }
  }
}

export default VehicleController;
