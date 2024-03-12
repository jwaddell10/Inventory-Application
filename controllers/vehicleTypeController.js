const VehicleType = require("../models/vehicletype");
console.log(VehicleType, 'this is veh type')
const Vehicle = require("../models/vehicle");
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
	const vehicleTypeId = req.params.id;
	console.log(vehicleTypeId, 'this is veh id')
    // Fetch details for the specific vehicle type using its ID
    const [type, vehiclesInType] = await Promise.all([
        VehicleType.find({ type: req.params.id}),
        Vehicle.find({ type: req.params.id }, "title summary").exec(),
    ]);
    console.log(type, 'this is type')
    if (!type) {
        const err = new Error("Vehicle type not found");
        err.status = 404;
        return next(err);
    }
    
    res.render("vehicle_type_detail", {
        title: "Vehicle type detail",
        type: type,
        type_vehicles: vehiclesInType,
    });
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
