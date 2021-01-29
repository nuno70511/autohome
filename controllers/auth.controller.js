const User = require("../models/user.model");
const { authorizationError } = require("../util/errorObjects");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const signup = async (req, res, next) => {
    try {
        await User.create({
            givenName: req.body.givenName,
            familyName: req.body.familyName,
            email: req.body.email,
            password: req.body.password
        });

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }, "password").exec();
        if (!user)
            next(authorizationError());

        const storedHash = user.password;

        const hashFromRequest = await bcrypt.hash(req.body.password, saltRounds);

        const isPasswordValid = await bcrypt.compare(storedHash, hashFromRequest);
        if (isPasswordValid) {
            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            
            res.status(200).json({ token });
        }
        else {
            next(authorizationError());
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    signup,
    signin
}