const Vehicle = require("../models/vehicle");
const Model = require("../models/model");
const VehicleInstance = require("../models/vehicleinstance");
const VehicleType = require("../models/vehicletype");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

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
	//data isnt displaying properly on view for some reason
	const findVehicles = await Vehicle.findById(req.params.id)
		.populate({
			path: "model",
		})
		.populate({
			path: "vehicle_type",
		})
		.exec();

	console.log(findVehicles, "this is findveh");
	res.render("vehicle_detail", {
		title: "Vehicle Details",
		vehicle: findVehicles,
	});
});

exports.vehicle_create_get = asyncHandler(async (req, res, next) => {
	const [allModels, allVehicleTypes] = await Promise.all([
		Model.find().sort({ name: 1 }).exec(),
		VehicleType.find().sort({ name: 1 }).exec(),
	]);

	res.render("vehicle_form", {
		title: "Create Vehicle Form",
		models: allModels,
		vehicle_types: allVehicleTypes,
	});
});

exports.vehicle_create_post = [
	body("make", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("model", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("number_in_stock", "Must contain at least 1 number")
		.trim()
		.isNumeric()
		.escape(),
	body("price", "Must contain at least 1 number").trim().isNumeric().escape(),
	body("vehicle_type", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const vehicle = new Vehicle({
			make: req.body.make,
			model: req.body.model,
			summary: req.body.summary,
			number_in_stock: req.body.number_in_stock,
			price: req.body.price,
			vehicle_type: req.body.vehicle_type,
		});
		console.log(vehicle, 'thisis vehicle')

		if (!errors.isEmpty()) {
			const [allModels, allVehicleTypes] = await Promise.all([
				Model.find().sort({ modelname: 1 }).exec(),
				VehicleType.find().sort({ type: 1 }).exec(),
			]);

			res.render("vehicle_form", {
				title: "Create Vehicle",
				models: allModels,
				vehicle_types: allVehicleTypes,
				vehicle: vehicle,
				errors: errors.array(),
			});
			return;
		} else {
			await vehicle.save();
			console.log(vehicle, 'this vehicle saved')
			res.redirect(vehicle.url);
		}
	}),
];

exports.vehicle_delete_get = asyncHandler(async (req, res, next) => {
	const [vehicles] = await Promise.all([
		Vehicle.findById(req.params.id)
			.populate("model")
			.populate("vehicle_type")
			.exec(),
	]);
	res.render("vehicle_delete", {
		title: "Delete Vehicle",
		vehicle: vehicles,
	});
});

exports.vehicle_delete_post = asyncHandler(async (req, res, next) => {
	const [vehicles] = await Promise.all([
		Vehicle.findById(req.params.id)
			.populate("model")
			.populate("vehicle_type")
			.exec(),
	]);

	if (vehicles) {
		await Vehicle.findByIdAndDelete(req.params.id).exec(),
			res.redirect("/catalog/vehicles");
	}
});

exports.vehicle_update_get = asyncHandler(async (req, res, next) => {
	const [vehicle, allModels, allVehicleTypes] = await Promise.all([
		Vehicle.findById(req.params.id).populate("model").exec(),
		Model.find().sort().exec(),
		VehicleType.find().sort().exec(),
	]);

	if (vehicle === null) {
		const err = new Error("Vehicle not found");
		err.status = 404;
		return next(err);
	}

	res.render("vehicle_form", {
		title: "Update Vehicle",
		models: allModels,
		vehicle_types: allVehicleTypes,
		vehicle: vehicle,
	});
});

exports.vehicle_update_post = [
	body("make", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("model", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("number_in_stock", "Must contain at least 1 number")
		.trim()
		.isNumeric()
		.escape(),
	body("price", "Must contain at least 1 number").trim().isNumeric().escape(),
	body("vehicle_type", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		// Async handler function
		const vehicle = new Vehicle({
			make: req.body.make,
			model: req.body.model,
			number_in_stock: req.body.number_in_stock,
			price: req.body.price,
			vehicle_type: req.body.vehicle_type,
			_id: req.params.id,
		});

		if (!errors.isEmpty()) {
			const [allModels, allVehicleTypes] = await Promise.all([
				Model.find().sort({ name: 1 }).exec(),
				VehicleType.find().sort({ name: 1 }).exec(),
			]);

			res.render("vehicle_form", {
				title: "Update Vehicle",
				model: allModels,
				vehicle_type: allVehicleTypes,
				vehicle: vehicle,
				errors: errors.array(),
			});
			return;
		} else {
			const updatedVehicle = await Vehicle.findByIdAndUpdate(
				req.params.id,
				vehicle,
				{}
			);
			res.redirect(updatedVehicle.url);
		}
	}),
];
