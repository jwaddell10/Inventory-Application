const VehicleInstance = require("../models/vehicleinstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Vehicle = require("../models/vehicle");
const Model = require("../models/model");

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
});

exports.vehicleinstance_detail = asyncHandler(async (req, res, next) => {
	console.log(req.params, "this is req params");
	const vehicleInstance = await VehicleInstance.findById(req.params.id)
		.populate({
			path: "model",
		})
		.populate({
			path: "vehicle",
		})
		.exec();

	if (vehicleInstance === null) {
		console.log("is this running");
		const err = new Error("Vehicle copy not found");
		err.status = 404;
		return next(err);
	}
	res.render("vehicle_instance_detail", {
		title: "Vehicle Instance Details",
		vehicleinstance: vehicleInstance,
	});
});

exports.vehicleinstance_create_get = asyncHandler(async (req, res, next) => {
	const [allModels, allVehicles, allStatuses] = await Promise.all([
		Model.find().sort({ name: 1 }).exec(),
		Vehicle.find().sort({ name: 1 }).exec(),
		VehicleInstance.schema.path("status").enumValues,
	]);

	res.render("vehicle_instance_form", {
		title: "Vehicle Instance Form",
		vehicle_list: allVehicles,
		model_list: allModels,
		status_list: allStatuses,
	});
});

exports.vehicleinstance_create_post = [
	body("vehicle", "Vehicle must be specified")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("model", "Model must be specified")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("status").escape(),
	body("due_back", "Invalid date").optional({ values: "falsy" }).toDate(),

	asyncHandler(async (req, res, next) => {
		console.log(req.body, "this is reqbody");
		const errors = validationResult(req);

		const vehicleinstance = new VehicleInstance({
			vehicle: req.body.vehicle,
			model: req.body.model,
			status: req.body.status,
			due_back: req.body.due_back,
		});
		console.log(vehicleinstance, 'thisis veh instance')

		if (!errors.isEmpty()) {

			res.render("vehicle_instance_form", {
				title: "Vehicle Instance Form",
				vehicle_list: allVehicles,
				model_list: allModels,
				selected_vehicle: vehicleinstance.vehicle._id,
				errors: errors.array(),
				vehicleinstance: vehicleinstance,
			});
			return;
		} else {
			await vehicleinstance.save();
			console.log(vehicleinstance, 'this is the saved instance')
			res.redirect("/catalog/vehicleinstances");
		}
	}),
];

exports.vehicleinstance_delete_get = asyncHandler(async (req, res, next) => {
	console.log(req.params, "this is req params in instance");
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
