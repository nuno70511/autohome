const express = require("express");
const controller = require("../controllers/user.controller");
const { body, param } = require("express-validator");
const validationResultHandler = require("../middleware/validationResultHandler");

const router = express.Router();

router.get("/", (req, res, next) => {
    controller.findAllUsers(req, res, next);
});

router.get("/:userId", (req, res, next) => {
    param("userId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'userId' is invalid")
    controller.findUserById(req, res, next);
});

router.patch("/:userId", [
    param("userId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'userId' is invalid"),
    body("givenName")
        .optional()
        .trim()
        .escape(),
    body("familyName")
        .optional()
        .trim()
        .escape(),
    body("contractedPower")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Field 'contractedPower' must be of int type and cannot be less than 0"),
    body("pin")
        .optional()
        .isInt()
], validationResultHandler, (req, res, next) => {
    controller.updateUserById(req, res, next);
});

router.delete("/:userId", [
    param("userId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'userId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.deleteUserById(req, res, next);
});

router.post("/:userId/phones", [
    param("userId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'userId' is invalid"),
    body("model")
        .exists()
        .withMessage("Missing required field 'model'")
        .trim()
        .escape(),
    body("imei")
        .exists()
        .withMessage("Missing required field 'imei'")
        .isIMEI()
        .withMessage("Field 'imei' is not a valid IMEI")
], validationResultHandler, (req, res, next) => {
    controller.connectPhone(req, res, next);
});

router.delete("/:userId/phones/:imei", [
    param("userId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'userId' is invalid"),
    param("imei")
        .isIMEI()
        .withMessage("Param 'imei' is not a valid IMEI")
], validationResultHandler, (req, res, next) => {
    controller.disconnectPhone(req, res, next);
});

router.post("/:userId/floors", [
    param("userId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'userId' is invalid"),
    body("floorId")
        .exists()
        .withMessage("Missing required field 'floorId'")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Field 'floorId' is invalid"),
], validationResultHandler, (req, res, next) => {
    controller.addFloor(req, res, next);
});

router.post("/:userId/scenes", [
    param("userId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'userId' is invalid"),
    body("sceneId")
        .exists()
        .withMessage("Missing required field 'sceneId'")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Field 'sceneId' is invalid"),
], validationResultHandler, (req, res, next) => {
    controller.addScene(req, res, next);
});

router.delete("/:userId/floors/:floorId", [
    param("userId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'userId' is invalid"),
    param("floorId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'floorId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.removeFloor(req, res, next);
});

router.delete("/:userId/floors/:sceneId", [
    param("userId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'userId' is invalid"),
    param("sceneId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'sceneId' is invalid")
], validationResultHandler, (req, res, next) => {
    controller.removeScene(req, res, next);
});

router.patch("/:userId/updatePassword", [
    param("userId")
        .custom(id => id.match(/^[0-9a-fA-F]{24}$/))
        .withMessage("Param 'userId' is invalid"),
    body("password")
        .exists()
        .withMessage("Missing required field 'password'")
        .trim()
        .escape()
], validationResultHandler, (req, res, next) => {
    controller.updatePassword(req, res, next);
});

module.exports = router;