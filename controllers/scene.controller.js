const Scene = require("../models/scene.model");

const projection = "_id name datetimeToStart datetimeToFinish devices";

const createOne = async (req, res, next) => {
    try {
        await Scene.create({
            name: req.body.name,
            datetimeToStart: req.body.datetimeToStart
        });

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

const findAll = async (req, res, next) => {
    try {
        const scenes = await Scene.find({}, projection);

        res.status(200).json(scenes);
    }
    catch (err) {
        next(err);
    }
}

const findOneById = async (req, res, next) => {
    try {
        const scene = await Scene.findById(req.params.id, projection).exec();

        res.status(200).json(scene);
    }
    catch (err) {
        next(err);
    }
}

const updateOneById = async (req, res, next) => {
    try {
        await Scene.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            datetimeToStart: req.body.datetimeToStart,
            datetimeToFinish: req.body.datetimeToFinish
        }).exec();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const deleteOneById = async (req, res, next) => {
    try {
        await Floor.findByIdAndDelete(req.params.id).exec();

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