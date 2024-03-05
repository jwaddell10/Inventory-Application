const Vehicle = require("../models/vehicle");
const asyncHandler = require("express-async-handler");

//count number of vehicles

exports.vehicle_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Vehicle list");
});

exports.vehicle_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Vehicle detail");
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
