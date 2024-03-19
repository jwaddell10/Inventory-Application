const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
	make: { type: String, required: true },
	model: { type: Schema.Types.ObjectId, ref: "Model", required: true },
	number_in_stock: { type: Number },
	price: { type: Number, required: true },
	vehicle_type: {
		type: Schema.Types.ObjectId,
		ref: "VehicleType",
		required: true,
	},
});

VehicleSchema.virtual("url").get(function () {
	// We don't use an arrow function as we'll need the this object
	return `/catalog/vehicles`;
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
