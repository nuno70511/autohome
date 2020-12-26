const express = require("express");
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    controller.signup(req, res, next);
});

router.post("/signin", (req, res, next) => {
    controller.signin(req, res, next);
});

module.exports = router;