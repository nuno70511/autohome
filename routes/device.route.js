const express = require("express");
const controller = require("../controllers/device.controller");
const { body, param } = require("express-validator");
const validationResultHandler = require("../middleware/validationResultHandler");

const router = express.Router();

router.get("/", (req, res, next) => {
    controller.findAllDevices(req, res, next);
});

router.post("/", [
    body("name")
        .exists()
        .withMessage("Missing required field 'name'")
        .trim()
        .escape(),
    body("type")
        .isIn([
            "Air Conditioning",
            "Blind",
            "Boiler",
            "Eletric Gate",
            "Eletric Lock",
            "EV Charging Station",
            "Light",
            "Radiator",
            "Solar Panel"])
        .withMessage("Field 'type' does not match any of the possible values. Check the documention for a list of valid types")
], validationResultHandler, (req, res, next) => {
    controller.createDevice(req, res, next);
});

router.get("/:deviceId", [
    param("deviceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'deviceId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.findDeviceById(req, res, next);
});

router.patch("/:deviceId", [
    param("deviceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'deviceId' is invalid"),
    body("name")
        .optional()
        .trim()
        .escape(),
    body("state")
        .optional()
        .isInt({ min: 0, max: 1 })
        .withMessage("Field 'state' must be 0 or 1"),
    body("temperature")
        .optional()
        .isInt()
        .withMessage("Field 'temperature' must be of int type"),
    body("isFavorite")
        .optional()
        .isBoolean()
        .withMessage("Field 'isFavorite' must be a boolean"),
    body("priority")
        .optional()
        .isIn([
            "A",
            "B",
            "C"])
        .withMessage("Field 'priority' does not match any of the possible values. Check the documention for a list of valid priorities"),
    body("maxPowerDraw")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Field 'maxPowerDraw' must be of int type and cannot be less than 0"),
], validationResultHandler, (req, res, next) => {
    controller.updateDeviceById(req, res, next);
});

router.delete("/:deviceId", [
    param("deviceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'deviceId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.deleteDeviceById(req, res, next);
});

router.post("/:deviceId/readings", [
    param("deviceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'deviceId' is invalid"),
    body("datetime")
        .exists()
        .withMessage("Missing required field 'datetime'")
        .isDate()
        .withMessage("Field 'datetime' is not a date, or it's not in a supported format"),
    body("value")
        .exists()
        .withMessage("Missing required field 'value'")
        .isInt({ min: 0 })
        .withMessage("Field 'value' must be of int type and cannot be less than 0")
], validationResultHandler, (req, res, next) => {
    controller.addReading(req, res, next);
});

module.exports = router;