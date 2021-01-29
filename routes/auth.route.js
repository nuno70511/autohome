const express = require("express");
const controller = require("../controllers/auth.controller");
const { body, param } = require("express-validator");
const validationResultHandler = require("../middleware/validationResultHandler");

const router = express.Router();

router.post("/signup", [
    body("firstName")
        .exists()
        .withMessage("Missing required field 'firstName'")
        .trim()
        .escape(),
    body("lastName")
        .exists()
        .withMessage("Missing required field 'lastName'")
        .trim()
        .escape(),
    body("email")
        .exists()
        .withMessage("Missing required field 'email'")
        .isEmail()
        .withMessage("Field 'email' is not a valid Email"),
    body("password")
        .exists()
        .withMessage("Missing required field 'password'")
        .trim()
        .escape()
], validationResultHandler, (req, res, next) => {
    controller.signup(req, res, next);
});

router.post("/signin", [
    body("email")
        .exists()
        .withMessage("Missing required field 'email'")
        .isEmail()
        .withMessage("Field 'email' is not a valid Email"),
    body("password")
        .exists()
        .withMessage("Missing required field 'password'")
        .trim()
        .escape()
], validationResultHandler, (req, res, next) => {
    controller.signin(req, res, next);
});

module.exports = router;