const express = require("express");
const controller = require("../controllers/user.controller");

const router = express.Router();

router.get("/", (req, res, next) => {
    controller.findAll(req, res, next);
});

router.get("/:userId", (req, res, next) => {
    controller.findOneById(req, res, next);
});

router.put("/:userId", (req, res, next) => {
    controller.updateOneById(req, res, next);
});

router.delete("/:userId", (req, res, next) => {
    controller.deleteOneById(req, res, next);
});

module.exports = router;