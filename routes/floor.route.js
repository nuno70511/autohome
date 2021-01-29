const express = require("express");
const controller = require("../controllers/floor.controller");
const { body, param } = require("express-validator");
const validationResultHandler = require("../middleware/validationResultHandler");
const verifyToken = require("../middleware/verifyJwt");

const router = express.Router();

router.get("/", verifyToken, (req, res, next) => {
    controller.findAllFloors(req, res, next);
});

router.post("/", verifyToken, [
    body("name")
        .exists()
        .withMessage("Missing required field 'name'")
        .isIn([
            "Attic",
            "Basement",
            "First Floor",
            "Ground Floor",
            "Outdoors",
            "Second Floor"])
        .withMessage("Field 'name' does not match any of the possible values. Check the documention for a list of valid names")
], validationResultHandler, (req, res, next) => {
    controller.createFloor(req, res, next);
});

router.get("/:floorId", verifyToken, [
    param("floorId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'id' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.findFloorById(req, res, next);
});

router.delete("/:floorId", verifyToken, [
    param("floorId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'id' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.deleteFloorById(req, res, next);
});

router.post("/:floorId/spaces", verifyToken, [
    param("floorId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'floorId' is invalid"),
    body("name")
        .exists()
        .withMessage("Missing required field 'name'")
        .trim()
        .escape(),
    body("type")
        .exists()
        .withMessage("Missing required field 'type'")
        .isIn([
            "Back Yard",
            "Bathroom",
            "Bedroom",
            "Dining Room",
            "Front Yard",
            "Garage",
            "Garden",
            "Hallway",
            "Kitchen",
            "Laundry Room",
            "Living Room",
            "Office",
            "Pantry",
            "Roof"])
        .withMessage("Field 'type' does not match any of the possible values. Check the documention for a list of valid types")
], validationResultHandler, (req, res, next) => {
    controller.createSpace(req, res, next);
});

router.put("/:floorId/spaces/:spaceId", verifyToken, [
    param("floorId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'floorId' is invalid"),
    param("spaceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'spaceId' is invalid"),
    body("name")
        .exists()
        .withMessage("Missing required field 'name'")
        .trim()
        .escape(),
    body("type")
        .exists()
        .withMessage("Missing required field 'type'")
        .isIn([
            "Back Yard",
            "Bathroom",
            "Bedroom",
            "Dining Room",
            "Front Yard",
            "Garage",
            "Garden",
            "Hallway",
            "Kitchen",
            "Laundry Room",
            "Living Room",
            "Office",
            "Pantry",
            "Roof"])
        .withMessage("Field 'type' does not match any of the possible values. Check the documention for a list of valid types")
], validationResultHandler, (req, res, next) => {
    controller.updateSpaceById(req, res, next);
});

router.delete("/:floorId/spaces/:spaceId", verifyToken, [
    param("floorId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'floorId' is invalid"),
    param("spaceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'spaceId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.deleteSpaceById(req, res, next);
});

router.post("/:floorId/spaces/:spaceId/devices", verifyToken, [
    param("floorId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'floorId' is invalid"),
    param("spaceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'spaceId' is invalid"),
    body("deviceId")
        .exists()
        .withMessage("Missing required field 'deviceId'")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Field 'deviceId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.addDeviceToSpace(req, res, next);
});

router.delete("/:floorId/spaces/:spaceId/devices/:deviceId", verifyToken, [
    param("floorId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'floorId' is invalid"),
    param("spaceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'spaceId' is invalid"),
    param("deviceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'deviceId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.removeDeviceFromSpace(req, res, next);
});

module.exports = router;