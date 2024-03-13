const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
	make: { type: String, required: true },
	model: { type: String, required: true },
	number_in_stock: { type: Number },
	price: { type: Number, required: true },
	vehicle_type: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
