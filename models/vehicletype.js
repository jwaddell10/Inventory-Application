const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleTypeSchema = new Schema({
	type: {
		type: String,
		required: true,
		enum: ["Car", "Truck", "Suv"],
		message: "Type must be 'Car', 'Truck', or 'SUV'",
	},
});

module.exports = mongoose.model("VehicleType", VehicleTypeSchema);
