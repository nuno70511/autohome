const User = require("../models/user.model");

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
        const user = await User.findOne({ email: req.body.email }).exec();

        if (user.password === req.body.password) {
            res.status(200).end();
        }
        else {
            res.status(401).end();
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    signup,
    signin
}