const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleTypeSchema = {
  type: {
    type: String,
    required: true,
    enum: ["Car", "Truck", "SUV"],
    message: "Type must be 'Car', 'Truck', or 'SUV'",
  },
};

module.exports = mongoose.model("VehicleType", VehicleTypeSchema)