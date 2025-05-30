class VehicleController{

    //1. Fetch Vehicle Types From DB
    async vehicleTypes(req, res){
        try{
            console.log("veghice type");
        }catch(err){
            console.log("Error in Controller", err);
        }
    }

    //2. Fetch Vehicle Lists from DB
    async vehicle(req, res){
        try{
            console.log("veghice");
        }catch(err){
            console.log("Error in Controller", err);
        }
    }

    //3. Vehicles Booking 
    async booking(req, res){
        try{    
            console.log("booking");
        }catch(err){
            console.log("Error in Controller", err);
        }
    }

}

export default VehicleController;