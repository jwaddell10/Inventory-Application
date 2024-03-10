const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
	make: { type: String, required: true },
	model: { type: Schema.Types.ObjectId, ref: "Model", required: true },
	number_in_stock: { type: Number },
	price: { type: Number, required: true },
	vehicle_type: {
		type: Schema.Types.ObjectId,
		ref: "Vehicle Type",
		required: true,
	},
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
