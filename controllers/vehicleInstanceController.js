const VehicleInstance = require("../models/vehicleinstance")
const asyncHandler = require("express-async-handler");

exports.vehicleinstance_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: VehicleInstance List")
})

exports.vehicleinstance_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: VehicleInstance Details");
})

exports.vehicleinstance_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: VehicleInstance create GET")
})

exports.vehicleinstance_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: VehicleInstance create POST")
})