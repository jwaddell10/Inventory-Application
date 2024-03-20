const Vehicle = require("../models/vehicle");
const Model = require("../models/model");
const VehicleInstance = require("../models/vehicleinstance");
const VehicleType = require("../models/vehicletype");
const asyncHandler = require("express-async-handler");
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
	});
});

exports.vehicle_create_get = asyncHandler(async (req, res, next) => {
	res.render("vehicle_form", {
		title: "Create Vehicle Form",
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
	body("price", "Must contain at least 1 number").trim().isNumeric().escape(),
	body("vehicle_type", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			// Handle validation errors
			res.render("vehicle_form", {
				title: "Create Vehicle",
				errors: errors.array(),
				vehicle: req.body,
			});
			return;
		}

		try {
			// Find the model ObjectId based on the model name
			const model = await Model.findOne({
				modelname: req.body.model,
			}).exec();
			const vehicletype = await VehicleType.findOne({
				type: req.body.vehicle_type,
			}).exec();
			if (!model || !vehicletype) {
				// Handle case where model name is not found
				throw new Error("Model/VehicleType not found");
			}

			// Create a new vehicle with the found model ObjectId
			const vehicle = new Vehicle({
				make: req.body.make,
				model: model._id, // Use the ObjectId of the model
				price: req.body.price,
				vehicle_type: vehicletype._id,
			});

			// Save the new vehicle to the database
			await vehicle.save();

			// Redirect to the newly created vehicle's details page
			res.redirect(vehicle.url);
		} catch (err) {
			// Handle any errors that occur during database operations
			next(err);
		}
	}),
];

exports.vehicle_delete_get = asyncHandler(async (req, res, next) => {
	console.log(req.params, "this is req params in vehicle");
	const [vehicles] = await Promise.all([
		Vehicle.findById(req.params.id).exec(),
	]);
	console.log(vehicles, "this is veh");

	res.render("Delete Vehicle", {
		title: "Delete Vehicle",
	});
});

exports.vehicle_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Vehicle delete POST");
});

exports.vehicle_update_get = asyncHandler(async (req, res, next) => {
	console.log(req.params, "thisis req");

	const [vehicle, allModels, allVehicleTypes] = await Promise.all([
		Vehicle.findById(req.params.id).populate("model vehicle_type").exec(),
		Model.find().sort({ price: 1 }).exec(),
		VehicleType.find().sort({ name: 1 }).exec(),
	]);

	if (vehicle === null) {
		const err = new Error("Vehicle not found");
		err.status = 404;
		return next(err);
	}

	allVehicleTypes.forEach((type) => {
		if (vehicle.type.includes(type._id)) type.checked = "true";
	});

	res.render("vehicle_form", {
		title: "Update Vehicle",
		models: allModels,
		vehicletypes: allVehicleTypes,
		vehicle: vehicle,
	});
});

exports.vehicle_update_post = [
	(req, res, next) => {
		console.log(req, "thisis req");
		if (!Array.isArray(req.body.vehicletype)) {
			req.body.vehicletype =
				typeof req.body.genre === "undefined"
					? []
					: [req.body.vehicletype];
		}
		next();
	},

	body("vehicle", "Vehicle must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("model", "Model must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("vehicle_type", "Vehicle Type must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const vehicle = new Vehicle({
			make: req.body.make,
			model: req.body.model,
			number_in_stock: req.body.number_in_stock,
			price: req.body.price,
			vehicle_type: req.body.vehicletype,
		});
		console.log(vehicle, "this is vehicle");

		if (!errors.isEmpty()) {
			const [allModels, allVehicleTypes] = await Promise.all([
				Model.find().sort({ price: 1 }).exec(),
				VehicleType.find().sort({ name: 1 }).exec(),
			]);

			for (const type of allVehicleTypes) {
				if (vehicle.type.indexOf(type._id) > -1) {
					type.checked = "true";
				}
			}
			res.render("vehicle_form", {
				title: "Update Vehicle",
				model: allModels,
				type: allVehicleTypes,
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
