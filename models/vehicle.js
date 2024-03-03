const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  make: { type: String, required: true },
  model: { type: Schema.Types.ObjectId, ref: "Model", required: true },
  vehicle_type: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle Type",
    required: true,
  },
});

<<<<<<< HEAD
module.exports = mongoose.model("Vehicle", VehicleSchema);
=======
module.exports = mongoose.model("Vehicle", VehicleSchema);
>>>>>>> 8a3c42bbe4fb57f232695af7c1a9798468daa19f
