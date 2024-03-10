const VehicleType = require("../models/vehicletype");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.vehicletype_list = asyncHandler(async (req, res, next) => {
	const allVehicleTypes = await VehicleType.find({}).exec();
	res.render("vehicle_type_list", {
		title: "Vehicle Types",
		vehicle_type_list: allVehicleTypes,
	});
});

exports.vehicletype_detail = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: VehicleType Details");
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
		console.log(req.body.name, "this is req");
		const errors = validationResult(req);

		const vehicleType = new VehicleType({
			type:
				// change text so it matches enum in VehicleType Schema ("Car, Truck, Suv")
				req.body.name.charAt(0).toUpperCase() +
				req.body.name.slice(1).toLowerCase(),
		});
		if (!errors.isEmpty()) {
			console.log(errors.array()); // Log the errors to the console
			res.render("vehicle_type_form", {
				title: "Create Vehicle Type",
				type: "",
				errors: errors.array(),
			});
			return;
		} else {
			const vehicleTypeExists = await VehicleType.findOne({
				name: req.body.name,
			})
				.collation({ locale: "en", strength: 3 })
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
