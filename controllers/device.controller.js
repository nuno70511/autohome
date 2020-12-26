const Device = require("../models/device.model");

const projection = "_id name state value type isFavorite readings";

const createOne = async (req, res, next) => {
    try {
        await Device.create({
            name: req.body.name,
            type: req.body.type
        });

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

const findAll = async (req, res, next) => {
    try {
        const devices = await Device.find({}, projection);

        res.status(200).json(devices);
    }
    catch (err) {
        next(err);
    }
}

const findOneById = async (req, res, next) => {
    try {
        const device = await Device.findById(req.params.id, projection).exec();

        res.status(200).json(device);
    }
    catch (err) {
        next(err);
    }
}

const updateOneById = async (req, res, next) => {
    try {
        await Device.findByIdAndUpdate(req.params.id, { name: req.body.name }).exec();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const deleteOneById = async (req, res, next) => {
    try {
        await Device.findByIdAndDelete(req.params.id).exec();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    createOne,
    findAll,
    findOneById,
    updateOneById,
    deleteOneById
}