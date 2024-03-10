const express = require("express");
const router = express.Router();

const vehicle_controller = require("../controllers/vehicleController");
console.log(vehicle_controller.vehicle_list, "this is vehiclecontroller");
const model_controller = require("../controllers/modelController");
const vehicle_instance_controller = require("../controllers/vehicleInstanceController");
const vehicle_type_controller = require("../controllers/vehicleTypeController");

// VEHICLE ROUTES //

// VEHICLE ROUTES //

router.get("/", vehicle_controller.index);

router.get("/vehicle/create", vehicle_controller.vehicle_create_get);

router.post("/vehicle/create", vehicle_controller.vehicle_create_post);

router.get("/vehicle/:id/delete", vehicle_controller.vehicle_delete_get);

router.post("/vehicle/:id/delete", vehicle_controller.vehicle_delete_post);

router.get("/vehicle/:id/update", vehicle_controller.vehicle_update_get);

router.post("/vehicle/:id/update", vehicle_controller.vehicle_update_post);

router.get("/vehicle/:id", vehicle_controller.vehicle_detail);

router.get("/vehicles", vehicle_controller.vehicle_list);

// MODEL ROUTES //

router.get("/model/create", model_controller.model_create_get);

router.post("/model/create", model_controller.model_create_post);

router.get("/model/:id/delete", model_controller.model_delete_get);

router.post("/model/:id/delete", model_controller.model_delete_post);

router.get("/model/:id/update", model_controller.model_update_get);

router.post("/model/:id/update", model_controller.model_update_post);

router.get("/model/:id", model_controller.model_detail);

router.get("/models", model_controller.model_list);

// VEHICLE INSTANCE ROUTES //

router.get(
	"/vehicleinstance/create",
	vehicle_instance_controller.vehicleinstance_create_get
);

router.post(
	"/vehicleinstance/create",
	vehicle_instance_controller.vehicleinstance_create_post
);

router.get(
	"/vehicleinstance/:id/delete",
	vehicle_instance_controller.vehicleinstance_delete_get
);

router.post(
	"/vehicleinstance/:id/delete",
	vehicle_instance_controller.vehicleinstance_delete_post
);

router.get(
	"/vehicleinstance/:id/update",
	vehicle_instance_controller.vehicleinstance_update_get
);

router.post(
	"/vehicleinstance/:id/update",
	vehicle_instance_controller.vehicleinstance_update_post
);

router.get(
	"/vehicleinstance/:id",
	vehicle_instance_controller.vehicleinstance_detail
);

router.get(
	"/vehicleinstances",
	vehicle_instance_controller.vehicle_instance_list
);

// VEHICLE TYPE ROUTES //

router.get(
	"/vehicletype/create",
	vehicle_type_controller.vehicletype_create_get
);

router.post(
	"/vehicletype/create",
	vehicle_type_controller.vehicletype_create_post
);

router.get("/vehicletype/:id", vehicle_type_controller.vehicletype_detail);

router.get(
	"/vehicletype/:id/delete",
	vehicle_type_controller.vehicletype_delete_get
);

router.post(
	"/vehicletype/:id/delete",
	vehicle_type_controller.vehicletype_delete_post
);

router.get(
	"/vehicletype/:id/update",
	vehicle_type_controller.vehicletype_update_get
);

router.post(
	"/vehicletype/:id/update",
	vehicle_type_controller.vehicletype_update_post
);

router.get("/vehicletype/:id", vehicle_type_controller.vehicletype_detail);

router.get("/vehicletypes", vehicle_type_controller.vehicletype_list);

module.exports = router;
