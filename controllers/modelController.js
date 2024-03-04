const Model = require("../models/model");
const asyncHandler = require("express-async-handler");

//get list of models, get details of models, get number of models in stock, get price of models

exports.model_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: List of models");
});

exports.model_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Model Details");
});

exports.model_numberInStock = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Number in stock");
});

exports.model_price = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Price");
});

exports.model_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Model create GET");
});

exports.model_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Model create POST");
});

exports.model_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Model deletes GET");
});

exports.model_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Model deletes POST");
});

exports.model_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Model updates GET");
});

exports.model_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Model updates post");
});
