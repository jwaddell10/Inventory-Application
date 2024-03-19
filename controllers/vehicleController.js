const Vehicle = require("../models/vehicle");
const Model = require("../models/model");
const VehicleInstance = require("../models/vehicleinstance");
const VehicleType = require("../models/vehicletype");
const asyncHandler = require("express-async-handler");

//count all vehicles

exports.index = asyncHandler(async (req, res, next) => {
	const [
		numVehicles,
		numModels,
		numVehicleInstances,
		numAvailableVehicleInstances,
		numVehicleTypes,
	] = await Promise.all([
		Vehicle.countDocuments({}).exec(),
		Model.countDocuments({}).exec(),
		VehicleInstance.countDocuments({}).exec(),
		VehicleInstance.countDocuments({ status: "Available" }).exec(),
		VehicleType.countDocuments({}).exec(),
	]);

	res.render("index", {
		title: "Vehicle Inventory Home",
		vehicle_count: numVehicles,
		model_count: numModels,
		vehicle_instance_count: numVehicleInstances,
		vehicle_instance_available_count: numAvailableVehicleInstances,
		vehicle_type_count: numVehicleTypes,
	});
});

exports.vehicle_list = asyncHandler(async (req, res, next) => {
	const allVehicles = await Vehicle.find({})
		.sort({ price: 1 })
		.populate("model")
		.populate("vehicle_type")
		.exec();
	res.render("vehicle_list", {
		title: "Vehicle List",
		vehicle_list: allVehicles,
	});
});

exports.vehicle_detail = asyncHandler(async (req, res, next) => {
	console.log(req.params, "thisi s reqparams veh details");

	const findVehicles = await VehicleInstance.find({
		vehicle: req.params.id,
	})
		.populate({
			path: "vehicle",
		})
		.populate({
			path: "model",
		})
		.exec();

	console.log(findVehicles, "this is findveh");
	res.render("vehicle_detail", {
		title: "Vehicle Instance Details",
		vehicle: findVehicles,
	})
});

exports.vehicle_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Vehicle create GET");
});

exports.vehicle_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Vehicle create POST");
});

exports.vehicle_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Vehicle delete GET");
});

exports.vehicle_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Vehicle delete POST");
});

exports.vehicle_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Vehicle update GET");
});

exports.vehicle_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Vehicle update POST");
});
