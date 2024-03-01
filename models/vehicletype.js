const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// async function vehicleTypeCreate(index, type) {
//     const vehicletype = new VehicleType({ type: type });
//     await vehicletype.save();
//     vehicletypes[index] = vehicletype;
//     console.log(`Added vehicletype: ${type}`);
//   }

const VehicleTypeSchema = {
  type: {
    type: String,
    required: true,
    enum: ["Car", "Truck", "SUV"],
    message: "Type must be 'Car', 'Truck', or 'SUV'",
  },
};

// vehicle_type: {
//     type: String,
//     required: true,
//     enum: ["Car", "Truck", "SUV"],
//     message: "Type must be `Car`, `Truck`, or `SUV`",
//   },

module.exports = mongoose.model("Vehicle Type Schema", VehicleTypeSchema)