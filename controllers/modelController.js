const { body, validationResult } = require("express-validator");
const Model = require("../models/model");
const Vehicle = require("../models/vehicle");
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
	try {
		const findModels = await Model.findById(req.params.id).exec();
		console.log(findModels, "this is find models");
		res.render("model_detail", {
			title: "Model Details",
			model_detail: findModels,
		});
	} catch (err) {
		next(err);
	}
});

exports.model_create_get = asyncHandler(async (req, res, next) => {
	// console.log(req.body, 'thisis req body in createget')
	const allModels = await Model.find({
		modelname: {
			$in: ["Civic", "Accord", "Ridgeline", "CR-V", "Passport"],
		},
	})
		.sort({ name: 1 })
		.exec();
	res.render("model_form", { title: "Create Model", models: allModels });
});

exports.model_create_post = [
	body("modelname", "Must contain at least 1 character")
		.trim()
		.isLength({ min: 1 })
		.isAlpha()
		.escape(),
	body("summary", "Must be at least 1 character")
		.trim()
		.isLength({ min: 3 })
		.isAlpha()
		.escape(),
	body("price", "Must be a number").trim().isNumeric().escape(),

	asyncHandler(async (req, res, next) => {
		console.log("is this running");
		console.log(req.body, "this is req body modelpost");

		const errors = validationResult(req);

		const model = new Model({
			modelname: req.body.modelname,
			summary: req.body.summary,
			price: req.body.price,
		});

		console.log(model, "this is model from createmodel");

		if (!errors.isEmpty()) {
			res.render("model_form", {
				title: "Create Model",
				model,
				errors: errors.array(),
			});
			return;
		} else {
			console.log("is this running?");
			const modelExists = await Model.findOne({
				model: req.body.modelname,
				summary: req.body.summary,
				price: req.body.price,
			}).exec();
			if (modelExists) {
				res.redirect(modelExists.url);
			} else {
				console.log(`${this._id}`, "its saving");
				await model.save();
				res.redirect(model.url);
			}
		}
	}),
];

exports.model_delete_get = asyncHandler(async (req, res, next) => {
	const [model, allVehiclesOfModel] = await Promise.all([
		Model.findById(req.params.id).exec(),
		Vehicle.find({ model: req.params.id }, "model").exec(),
	]);

	if (model === null) {
		res.redirect("/catalog/models");
	}

	res.render("model_delete", {
		title: "Delete Model",
		model: model,
		model_vehicles: allVehiclesOfModel,
	});
});

exports.model_delete_post = asyncHandler(async (req, res, next) => {
	const [model, allVehiclesOfModel] = await Promise.all([
		Model.findById(req.params.id).exec(),
		Vehicle.find({ model: req.params.id }, "model summary").exec(),
	]);

	if (allVehiclesOfModel.length > 0) {
		res.render("model_delete", {
			title: "Delete Model",
			model: model,
			model_vehicles: allVehiclesOfModel,
		});
		return;
	} else {
		await Model.findByIdAndDelete(req.body.modelid);
		res.redirect("/catalog/models");
	}
});

exports.model_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Model updates GET");
});

exports.model_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Model updates post");
});
