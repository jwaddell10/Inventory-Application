#! /usr/bin/env node
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB =
	"mongodb+srv://jwaddell:Thatsfunny1@cluster0.6m5heg5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log(
	'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const Vehicle = require("./models/vehicle");
const Model = require("./models/model");
const VehicleType = require("./models/vehicletype");
const VehicleInstance = require("./models/vehicleinstance");

const vehicles = [];
const models = [];
const vehicletypes = [];
const vehicleinstances = [];

main().catch((err) => console.log(err));

async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect(mongoDB);
	console.log("Debug: Should be connected?");

	await Promise.all([
		Vehicle.deleteMany(),
		Model.deleteMany(),
		VehicleType.deleteMany(),
		VehicleInstance.deleteMany(),
	]);

	await createVehicleType();
	await createModel();
	await createVehicle();
	await createVehicleInstance();
	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}

async function vehicleTypeCreate(index, type) {
	const vehicletype = new VehicleType({ type: type });
	await vehicletype.save();
	vehicletypes[index] = vehicletype;
	console.log(`Added vehicletype: ${type}`);
}

async function modelCreate(index, modelname, summary, number_in_stock, price) {
	const modeldetail = {
		modelname: modelname,
		summary: summary,
		number_in_stock: number_in_stock,
		price: price,
	};

	const model = new Model(modeldetail);

	await model.save();
	models[index] = model;
	console.log(`Added model: ${modelname}`);
}

async function vehicleCreate(index, make, model, vehicle_type, price) {
	const vehicledetail = {
		make: make,
		model: model,
		vehicle_type: vehicle_type,
		price: price,
	};

	const vehicle = new Vehicle(vehicledetail);
	await vehicle.save();
	vehicles[index] = vehicle;
	console.log(`Added vehicle: ${make}`);
}

async function vehicleInstanceCreate(index, vehicle, model, status, due_back) {
	const vehicleinstancedetail = {
		vehicle: vehicle,
		model: model,
		status: status,
		due_back: due_back,
	};

	const vehicleinstance = new VehicleInstance(vehicleinstancedetail);
	await vehicleinstance.save();
	vehicleinstances[index] = vehicleinstance;
	console.log(`Added vehicle instance: ${vehicle}`);
}

async function createVehicleType() {
	console.log("Adding vehicletype");
	await Promise.all([
		vehicleTypeCreate(0, "Car"),
		vehicleTypeCreate(1, "Truck"),
		vehicleTypeCreate(2, "Suv"),
	]);
}

async function createModel() {
	console.log("Adding models");
	await Promise.all([
		modelCreate(
			0,
			"Civic",
			`The Honda Civic boasts praiseworthy performance, high fuel economy, excellent passenger 
        space and a refined design. There are a few minor drawbacks, such as elevated road noise
        on the highway, but overall the Civic is a great pick for a small sedan.`,
			5,
			500
		),
		modelCreate(
			1,
			"Accord",
			`The latest Accord is a solid choice for a family sedan. It's roomy, practical and easy to 
        drive. It's also impressively fuel-efficient if you get the hybrid powertrain. But some 
        of the Accord's newest tech and features are exclusively available on the top trim level, 
        the Touring. Unless you're willing to shell out for a fully loaded model, the Accord just 
        doesn't stand out in the class like it used to.`,
			7,
			1000
		),
		modelCreate(
			2,
			"Ridgeline",
			`Honda's 2024 Ridgeline is a distinctive pick for a midsize truck. Unlike rival trucks that 
        are based on a traditional body-on-frame design, the Ridgeline is built more like a crossover
        SUV with its unibody construction and independent rear suspension. Going this route gives the
        Ridgeline a distinct advantage in ride comfort and interior space. But on the downside it can't
        quite match the maximum towing capacity and off-road performance of other trucks. As such, the 
        appeal of the Ridgeline largely depends on what you're planning on using your midsize truck for.`,
			3,
			5000
		),
		modelCreate(
			3,
			"CR-V",
			`There's a reason many consider the Honda CR-V the benchmark small SUV for families. Its latest
        version pulls off this feat yet again with a smooth ride, helpful tech features and excellent
        storage space. Still, competitors have improved significantly. The CR-V is a good choice but 
        no longer the clear leader.`,
			10,
			3000
		),
		modelCreate(
			4,
			"Passport",
			`The Honda Passport is one of the most versatile SUVs on the market. It exudes an athletic character 
        from both a design and performance standpoint, but it also delivers a comfortable ride, plenty 
        of cargo space and decent fuel economy. It also comes with a good number of standard features, 
        excellent smartphone integration and plentiful interior storage.`,
			7,
			4000
		),
	]);
}

async function createVehicleInstance() {
	console.log("Adding vehicle instances");
	await Promise.all([
		vehicleInstanceCreate(0, vehicles[0], models[0]),
		vehicleInstanceCreate(
			0,
			vehicles[1],
			models[1],
			"Maintenance",
			"04/02/2024"
		),
		vehicleInstanceCreate(0, vehicles[2], models[2], "Reserved"),
		vehicleInstanceCreate(0, vehicles[3], models[3], "Rented"),
		vehicleInstanceCreate(0, vehicles[4], models[4]),
	]);
}

async function createVehicle() {
	console.log("Adding Vehicles");
	await Promise.all([
		vehicleCreate(0, "Honda", models[0], vehicletypes[0], 500),
		vehicleCreate(1, "Honda", models[1], vehicletypes[0], 1000),
		vehicleCreate(2, "Honda", models[2], vehicletypes[1], 5000),
		vehicleCreate(3, "Honda", models[3], vehicletypes[2], 3000),
		vehicleCreate(4, "Honda", models[4], vehicletypes[2], 4000),
	]);
}
