const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleInstanceSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
    model: { type: Schema.Types.ObjectId, ref: "Model", required: true}, 
    status: {
        type: String,
        required: true,
        enum: ["Available", "Maintenance", "Rented", "Reserved"],
        default: "Available",
    },
    due_back: { type: Date, default: Date.now }
})

module.exports = mongoose.model("VehicleInstance", VehicleInstanceSchema)