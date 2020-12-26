const Floor = require("../models/floor.model");

const projection = "_id name spaces";

const createOne = async (req, res, next) => {
    try {
        await Floor.create({
            name: req.body.name
        });

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

const findAll = async (req, res, next) => {
    try {
        const floors = await Floor.find({}, projection);

        res.status(200).json(floors);
    }
    catch (err) {
        next(err);
    }
}

const findOneById = async (req, res, next) => {
    try {
        const floor = await Floor.findById(req.params.id, projection).exec();

        res.status(200).json(floor);
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
    deleteOneById
}