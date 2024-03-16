const { body, validationResult } = require("express-validator");
const Model = require("../models/model");
const asyncHandler = require("express-async-handler");

//get list of models, get details of models, get number of models in stock, get price of models

exports.model_list = asyncHandler(async (req, res, next) => {
	const allModels = await Model.find({}).sort({ price: 1 }).exec();

	res.render("model_list", {
		title: "Model List",
		model_list: allModels,
	});
});

exports.model_detail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Model Detail ${req.body}`);
});

exports.model_create_get = asyncHandler(async (req, res, next) => {
	res.render("model_form", { title: "Create Model" });
});

exports.model_create_post = [
	body("model_name", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Must be at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Model must have a description")
		.escape(),
	body("price", "Must be a number").trim(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const model = new Model({
			model_name: req.body.name,
		});

		if (!errors.isEmpty()) {
			res.render("model_form", {
				title: "Create Model",
				model: model,
				errors: errors.array(),
			});
			return;
		} else {
			console.log(req.body.name, "this is req name");
			const modelNameExists = await Model.findOne({
				name: req.body.name,
			});
			await model.save();
			res.redirect(model.url);
		}
	}),
];

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
