const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleTypeSchema = new Schema({
	type: {
		type: String,
		required: true,
		enum: {
			values: ["Car", "Truck", "Suv"],
			message: "Type must be 'Car', 'Truck', or 'Suv'",
		},
	},
});

VehicleTypeSchema.virtual("url").get(function () {
	// We don't use an arrow function as we'll need the this object
	return `/catalog/vehicletype/${this._id}`;
});

module.exports = mongoose.model("VehicleType", VehicleTypeSchema);
