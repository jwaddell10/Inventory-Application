const VehicleType = require("../models/vehicletype");
const Vehicle = require("../models/vehicle");
console.log(Vehicle, "this is veh");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.vehicle_type_list = asyncHandler(async (req, res, next) => {
	const allVehicleTypes = await VehicleType.find({}).exec();
	res.render("vehicle_type_list", {
		title: "Vehicle Types",
		vehicle_type_list: allVehicleTypes,
	});
});

exports.vehicle_type_detail = asyncHandler(async (req, res, next) => {
	console.log(req.params, 'thisis req vehicletype')
	try {
		const vehiclesInType = await Vehicle.find({
			vehicle_type: req.params.id,
		})
			.select("-vehicle_type.__v")
			.populate({
				path: "model",
				select: "-__v",
			})
			.populate({
				path: "vehicle_type",
				select: "-__v",
			})
			.exec();
		console.log(vehiclesInType, "Vehicles in type");

		if (vehiclesInType.length === 0) {
			const err = new Error("No vehicles with that type");
			err.status = 404;
			throw err;
		}

		const type = await VehicleType.findById(req.params.id).exec();
		// console.log(type, "Vehicle type details");

		if (!type) {
			const err = new Error("Vehicle type not found");
			err.status = 404;
			throw err;
		}

		res.render("vehicle_type_detail", {
			title: "Vehicle Detail",
			type: type,
			vehicles_in_type: vehiclesInType,
		});
	} catch (err) {
		next(err);
	}
});

exports.vehicletype_create_get = asyncHandler(async (req, res, next) => {
	res.render("vehicle_type_form", { title: "Create Vehicle Type" });
});

exports.vehicletype_create_post = [
	body("name", "Vehicle type must contain at least 3 characters")
		.trim()
		.isLength({ min: 3 })
		.escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const vehicleType = new VehicleType({
			type:
				// change text so it matches enum in VehicleType Schema ("Car, Truck, Suv")
				req.body.name.charAt(0).toUpperCase() +
				req.body.name.slice(1).toLowerCase(),
		});
		if (!errors.isEmpty()) {
			console.log(errors.array());
			res.render("vehicle_type_form", {
				title: "Create Vehicle Type",
				type: "",
				errors: errors.array(),
			});
			return;
		} else {
			console.log(req, 'this is req name')
			const vehicleTypeExists = await VehicleType.findOne({
				type: req.body.name,
			})
				.collation({ locale: "en", strength: 2 })
				.exec();
			if (vehicleTypeExists) {
				res.redirect(vehicleTypeExists.url);
			} else {
				await vehicleType.save();
				res.redirect(vehicleType.url);
			}
		}
	}),
];

exports.vehicletype_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleType delete GET");
});

exports.vehicletype_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleType delete POST");
});

exports.vehicletype_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleType update GET");
});

exports.vehicletype_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleType update POST");
});
