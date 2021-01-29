const express = require("express");
const controller = require("../controllers/auth.controller");
const { body, param } = require("express-validator");
const validationResultHandler = require("../middleware/validationResultHandler");

const router = express.Router();

router.post("/signup", [
    body("givenName")
        .exists()
        .withMessage("Missing required field 'givenName'")
        .trim()
        .escape(),
    body("familyName")
        .exists()
        .withMessage("Missing required field 'familyName'")
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