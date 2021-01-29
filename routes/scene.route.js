const express = require("express");
const controller = require("../controllers/scene.controller");
const { body, param } = require("express-validator");
const validationResultHandler = require("../middleware/validationResultHandler");
const verifyToken = require("../middleware/verifyJwt");

const router = express.Router();

router.get("/", verifyToken,(req, res, next) => {
    controller.findAllScenes(req, res, next);
});

router.post("/", verifyToken, [
    body("name")
        .exists()
        .withMessage("Missing required field 'name'")
        .trim()
        .escape(),
    body("datetimeToStart")
        .exists()
        .withMessage("Missing required field 'datetimeToStart'")
        .isDate()
        .withMessage("Field 'datetimeToStart' is not a date, or it's not in a supported format")
], validationResultHandler, (req, res, next) => {
    controller.createScene(req, res, next);
});

router.get("/:sceneId", verifyToken, [
    param("sceneId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'sceneId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.findSceneById(req, res, next);
});

router.patch("/:sceneId", verifyToken, [
    param("sceneId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'sceneId' is invalid"),
    body("name")
        .optional()
        .trim()
        .escape(),
    body("datetimeToStart")
        .optional()
        .isDate()
        .withMessage("Field 'datetimeToStart' is not a date, or it's not in a supported format"),
    body("datetimeToFinish")
        .optional()
        .isDate()
        .withMessage("Field 'datetimeToFinish' is not a date, or it's not in a supported format")
], validationResultHandler, (req, res, next) => {
    controller.updateSceneById(req, res, next);
});

router.delete("/:sceneId", verifyToken, [
    param("sceneId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'sceneId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.deleteSceneById(req, res, next);
});

router.post("/:sceneId/devices", verifyToken, [
    param("sceneId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'sceneId' is invalid"),
    body("deviceId")
        .exists()
        .withMessage("Missing required field 'deviceId'")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'deviceId' is invalid"),
    body("stateOnStart")
        .exists()
        .withMessage("Missing required field 'stateOnStart'")
        .isInt({ min: 0, max: 1})
        .withMessage("Field 'stateOnStart' must be 0 or 1"),
    body("valueOnStart")
        .optional()
        .isInt()
        .withMessage("Field 'valueOnStart' must be of int type"),
    body("stateOnFinish")
        .optional()
        .isInt({ min: 0, max: 1})
        .withMessage("Field 'stateOnFinish' must be 0 or 1"),
    body("valueOnFinish")
        .optional()
        .isInt()
        .withMessage("Field 'valueOnFinish' must be of int type"),
], validationResultHandler, (req, res, next) => {
    controller.scheduleActivity(req, res, next);
});

router.patch("/:sceneId/devices/:deviceId", verifyToken, [
    param("sceneId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'sceneId' is invalid"),
    param("deviceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'deviceId' is invalid"),
    body("stateOnStart")
        .exists()
        .withMessage("Missing required field 'stateOnStart'")
        .isInt({ min: 0, max: 1})
        .withMessage("Field 'stateOnStart' must be 0 or 1"),
    body("valueOnStart")
        .optional()
        .isInt()
        .withMessage("Field 'valueOnStart' must be of int type"),
    body("stateOnFinish")
        .optional()
        .isInt({ min: 0, max: 1})
        .withMessage("Field 'stateOnFinish' must be 0 or 1"),
    body("valueOnFinish")
        .optional()
        .isInt()
        .withMessage("Field 'valueOnFinish' must be of int type"),
], validationResultHandler, (req, res, next) => {
    controller.updateActivity(req, res, next);
});

router.delete("/:sceneId/devices/:deviceId", verifyToken, [
    param("sceneId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'sceneId' is invalid"),
    param("deviceId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'deviceId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.cancelActivity(req, res, next);
});

module.exports = router;