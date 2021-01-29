const User = require("../models/user.model");
const Floor = require("../models/floor.model");
const Scene = require("../models/scene.model");
const { idNotFoundError, authorizationError, conflictError, resourceNotFoundError } = require("../util/errorObjects");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const projection = "_id givenName familyName email pin phoneList contractedPower floors scenes";

const findAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, projection);

        res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
}

const findUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId, projection).exec();
        if (!user)
            next(idNotFoundError("user"));

        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
}

const updateUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).exec();
        if (!user)
            next(idNotFoundError("user"));

        await User.findByIdAndUpdate(req.params.userId, {
            ...req.body.givenName       && { givenName: req.body.givenName              },
            ...req.body.familyName      && { familyName: req.body.familyName            },
            ...req.body.contractedPower && { contractedPower: req.body.contractedPower  },
            ...req.body.pin             && { pin: req.body.pin                          }
        }).exec();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId).exec();
        if (!user)
            next(idNotFoundError("user"));

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const connectPhone = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).exec();
        if (!user)
            next(idNotFoundError("user"));

        if (user.phoneList.find(phone => phone.imei === req.body.imei))
            next(conflictError("user", "imei"))

        user.phoneList.push({
            model: req.body.model,
            imei: req.body.imei
        });
        await user.save();

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

const disconnectPhone = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).exec();
        if (!user)
            next(idNotFoundError("user"));

        if (!user.phoneList.find(phone => phone.imei === req.params.imei))
            next(resourceNotFoundError("imei"))

        user.phoneList = user.phoneList.filter(phone => phone.imei !== req.params.imei);
        await scene.save();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId, "password").exec();
        if (!user)
            next(idNotFoundError("user"));

        const storedHash = user.password;

        const hashFromRequest = await bcrypt.hash(req.body.oldPassword, saltRounds);

        const isPasswordValid = await bcrypt.compare(storedHash, hashFromRequest);
        if (isPasswordValid) {
            const newHash = await bcrypt.hash(req.body.newPassword, saltRounds);

            await User.findByIdAndUpdate(req.params.userId, {
                password: newHash
            }).exec();
        }
        else {
            next(authorizationError());
        }
    }
    catch (err) {
        next(err);
    }
}

const addFloor = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).exec();
        if (!user)
            next(idNotFoundError("user"));

        const floor = await Floor.findById(req.body.floorId).exec();
        if (!floor)
            next(idNotFoundError("floor"));

        if (user.floors.find(f => f._id === req.body.floorId))
            next(conflictError("user", "floorId"))

        user.floors.push(req.body.floorId);
        await user.save();

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

const removeFloor = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).exec();
        if (!user)
            next(idNotFoundError("user"));

        if (!user.floors.find(f => f._id === req.params.floorId))
            next(idNotFoundError("floor"))

        user.floors = user.floors.filter(f => f._id !== req.params.floorId);
        await user.save();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const addScene = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).exec();
        if (!user)
            next(idNotFoundError("user"));

        const scene = await Scene.findById(req.body.sceneId).exec();
        if (!scene)
            next(idNotFoundError("scene"));

        if (user.scenes.find(s => s._id === req.body.sceneId))
            next(conflictError("user", "sceneId"))

        user.scenes.push(req.body.sceneId);
        await user.save();

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

const removeScene = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).exec();
        if (!user)
            next(idNotFoundError("user"));

        if (!user.scenes.find(s => s._id === req.params.sceneId))
            next(idNotFoundError("scene"))

        user.scenes = user.scenes.filter(s => s._id !== req.params.sceneId);
        await user.save();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    findAllUsers,
    findUserById,
    updateUserById,
    deleteUserById,
    connectPhone,
    disconnectPhone,
    addFloor,
    removeFloor,
    addScene,
    removeScene,
    updatePassword
}