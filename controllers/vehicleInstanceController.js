const VehicleInstance = require("../models/vehicleinstance");
const asyncHandler = require("express-async-handler");

exports.vehicle_instance_list = asyncHandler(async (req, res, next) => {
	const allAvailableVehicles = await VehicleInstance.countDocuments({
		status: "Available",
	});

	const allVehicleInstances = await VehicleInstance.find({})
		.populate("vehicle")
		.populate("model")
		.exec();

	res.render("vehicle_instance_list", {
		title: "Vehicle Instances",
		vehicle_instance_list: allVehicleInstances,
		available_vehicles_list: allAvailableVehicles,
	});
	console.log(allVehicleInstances, "this is vehicle isntances");
});

exports.vehicleinstance_detail = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleInstance Details");
});

exports.vehicleinstance_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleInstance create GET");
});

exports.vehicleinstance_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleInstance create POST");
});

exports.vehicleinstance_delete_get = asyncHandler(async (req, res, next) => {
	console.log(req.params, 'this is req params in instance')
});

exports.vehicleinstance_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleInstance delete POST");
});

exports.vehicleinstance_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleInstance update GET");
});

exports.vehicleinstance_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleInstance update POST");
});
