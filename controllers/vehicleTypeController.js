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
    try {        
        // Fetch details for the specific vehicle type using its ID
        const type = await VehicleType.findById(req.params.id).exec();
        console.log(type, "Vehicle type details");

        if (!type) {
            const err = new Error("Vehicle type not found");
            err.status = 404;
            throw err;
        }

        // Find vehicles that belong to the specific vehicle type
		const vehiclesInType = await Vehicle.find({ vehicle_type: type.type }).exec();
        console.log(vehiclesInType, "Vehicles in type");

        if (vehiclesInType.length === 0) {
            const err = new Error("No vehicles with that type");
            err.status = 404;
            throw err;
        }
        
        res.render("vehicle_type_detail", {
            title: "Vehicle type detail",
            type: type,
            type_vehicles: vehiclesInType,
        });
    } catch (err) {
        next(err); // Pass error to the error handling middleware
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
