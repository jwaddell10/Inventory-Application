const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// async function vehicleCreate(index, make, model, vehicle_type) {
//     const vehicledetail = {
//       make: make,
//       model: model,
//       vehicle_type: vehicle_type,
//     };

const VehicleSchema = new Schema({
  make: { type: String, required: true },
  model: { type: Schema.Types.ObjectId, ref: "Model", required: true },
  vehicle_type: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle Type",
    required: true,
  },
});

module.exports = mongoose.model("Vehicle Schema", VehicleSchema);
