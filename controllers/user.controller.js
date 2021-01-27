const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const projection = "_id givenName familyName email phoneList floors scenes";

const findAll = async (req, res, next) => {
    try {
        const users = await User.find({}, projection);

        res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
}

const findOneById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id, projection).exec();

        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
}

const updateOneById = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            givenName: req.body.givenName,
            familyName: req.body.familyName
        }).exec();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const deleteOneById = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id).exec();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id, "password").exec();
        const storedHash = user.password;

        const hashFromRequest = await bcrypt.hash(req.body.oldPassword, saltRounds);

        const isPasswordValid = await bcrypt.compare(storedHash, hashFromRequest);
        if (isPasswordValid) {
            const newHash = await bcrypt.hash(req.body.newPassword, saltRounds);

            await User.findByIdAndUpdate(req.params.id, {
                password: newHash
            }).exec();
        }
        else {
            const err = {
                status: 401
            };
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    findAll,
    findOneById,
    updateOneById,
    deleteOneById
}