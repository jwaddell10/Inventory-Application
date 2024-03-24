const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const VehicleInstanceSchema = new Schema({
	vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
	model: { type: Schema.Types.ObjectId, ref: "Model", required: true },
	status: {
		type: String,
		required: true,
		enum: ["Available", "Maintenance", "Rented", "Reserved"],
		default: "Available",
	},
	due_back: { type: Date, default: Date.now },
});

VehicleInstanceSchema.virtual("due_back_formatted").get(function () {
	return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

VehicleInstanceSchema.virtual("url").get(function () {
	// We don't use an arrow function as we'll need the this object
	return `/catalog/vehicleinstances/${this._id}`;
});

module.exports = mongoose.model("VehicleInstance", VehicleInstanceSchema);
