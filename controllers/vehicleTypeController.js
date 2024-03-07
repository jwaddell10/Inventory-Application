const VehicleType = require("../models/vehicletype");
const asyncHandler = require("express-async-handler");

exports.vehicletype_list = asyncHandler(async (req, res, next) => {
  const allVehicleTypes = await VehicleType.find({}).exec();
console.log(allVehicleTypes, 'this is allvehiclesltypes')
  res.render("vehicle_type_list", {
    title: "Vehicle Types",
    vehicle_type_list: allVehicleTypes,
  });
});

exports.vehicletype_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: VehicleType Details");
});

exports.vehicletype_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: VehicleType create GET");
});

exports.vehicletype_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: VehicleType create POST");
});

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
