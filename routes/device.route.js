const express = require("express");
const controller = require("../controllers/device.controller");

const router = express.Router();

router.get("/", (req, res, next) => {
    controller.findAll(req, res, next);
});

router.post("/", (req, res, next) => {
    controller.createOne(req, res, next);
});

router.get("/:deviceId", (req, res, next) => {
    controller.findOneById(req, res, next);
});

router.put("/:deviceId", (req, res, next) => {
    controller.updateOneById(req, res, next);
});

router.delete("/:deviceId", (req, res, next) => {
    controller.deleteOneById(req, res, next);
});

module.exports = router;