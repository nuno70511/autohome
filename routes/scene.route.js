const express = require("express");
const controller = require("../controllers/scene.controller");

const router = express.Router();

router.get("/", (req, res, next) => {
    controller.findAll(req, res, next);
});

router.post("/", (req, res, next) => {
    controller.createOne(req, res, next);
});

router.get("/:sceneId", (req, res, next) => {
    controller.findOneById(req, res, next);
});

router.put("/:sceneId", (req, res, next) => {
    controller.updateOneById(req, res, next);
});

router.delete("/:sceneId", (req, res, next) => {
    controller.deleteOneById(req, res, next);
});

module.exports = router;