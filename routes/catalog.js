const express = require("express");
const router = express.Router();

const vehicle_controller = require("../controllers/vehicleController");
const model_controller = require("../controllers/modelController");
const vehicle_instance_controller = require("../controllers/vehicleInstanceController");
const vehicle_type_controller = require("../controllers/vehicleType");
const vehicle = require("../models/vehicle");

router.get("/", vehicle_controller.index);

router.get("/vehicle/create", vehicle_controller.vehicle_create_get);

router.get("/vehicle/create", vehicle_controller.vehicle_create_post);

router.get("/vehicle/:id/delete", vehicle_controller.vehicle_delete_get);

router.get("/vehicle/:id/delete", vehicle_controller.vehicle_delete_post);

router.get("/vehicle/:id/update", vehicle_controller.vehicle_update_get);

router.get("/vehicle/:id/update", vehicle_controller.vehicle_update_post);

router.get("/vehicle/:id", vehicle_controller.vehicle_detail);
