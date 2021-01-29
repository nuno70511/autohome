const Floor = require("../models/floor.model");
const { idNotFoundError, conflictError } = require("../util/errorObjects");

const projection = "_id name spaces";

const createFloor = async (req, res, next) => {
    try {
        const floor = await Floor.findOne({ name: req.body.name }).exec();
        if (floor)
            next(conflictError("floor", "name"));

        await Floor.create({
            name: req.body.name
        });

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

const findAllFloors = async (req, res, next) => {
    try {
        const floors = await Floor.find({}, projection);

        res.status(200).json(floors);
    }
    catch (err) {
        next(err);
    }
}

const findFloorById = async (req, res, next) => {
    try {
        const floor = await Floor.findById(req.params.floorId, projection).exec();
        if (!floor)
            next(idNotFoundError("floor"));

        res.status(200).json(floor);
    }
    catch (err) {
        next(err);
    }
}

const deleteFloorById = async (req, res, next) => {
    try {
        const floor = await Floor.findByIdAndDelete(req.params.floorId).exec();
        if (!floor)
            next(idNotFoundError("floor"));

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const createSpace = async (req, res, next) => {
    try {
        const floor = await Floor.findById(req.params.floorId).exec();
        if (!floor)
            next(idNotFoundError("floor"));

        floor.spaces.push({
            name: req.body.name,
            type: req.body.type
        });
        await floor.save();

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

const updateSpaceById = async (req, res, next) => {
    try {
        const floor = await Floor.findById(req.params.floorId).exec();
        if (!floor)
            next(idNotFoundError("floor"));

        const spaceIndex = floor.spaces.findIndex(space => space._id === req.params.spaceId);
        if (spaceIndex === -1)
            next(idNotFoundError("space"));

        floor.spaces[spaceIndex] = {
            name: req.body.name,
            type: req.body.type
        }
        await floor.save();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const deleteSpaceById = async (req, res, next) => {
    try {
        const floor = await Floor.findById(req.params.floorId).exec();
        if (!floor)
            next(idNotFoundError("floor"));

        const space = floor.spaces.find(space => space._id === req.params.spaceId);
        if (!space)
            next(idNotFoundError("space"));

        floor.spaces = floor.spaces.filter(s => s._id != space._id);
        await floor.save();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const addDeviceToSpace = async (req, res, next) => {
    try {
        const floor = await Floor.findById(req.params.floorId).exec();
        if (!floor)
            next(idNotFoundError("floor"));

        const spaceIndex = floor.spaces.findIndex(space => space._id === req.params.spaceId);
        if (spaceIndex === -1)
            next(idNotFoundError("space"));

        const deviceList = floor.spaces[spaceIndex].devices;
        if (deviceList.find(d => d._id === req.body.device)){
            next(conflictError("device", "deviceId"));
        }
        
        deviceList.push(req.body.deviceId);
        await floor.save();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const removeDeviceFromSpace = async (req, res, next) => {
    try {
        const floor = await Floor.findById(req.params.floorId).exec();
        if (!floor)
            next(idNotFoundError("floor"));

        const spaceIndex = floor.spaces.find(space => space._id === req.params.spaceId);
        if (spaceIndex === -1)
            next(idNotFoundError("space"));

        const deviceList = floor.spaces[spaceIndex].devices;
        deviceList = deviceList.filter(device => device._id != req.params.deviceId);
        await floor.save();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    createFloor,
    findAllFloors,
    findFloorById,
    deleteFloorById,
    createSpace,
    updateSpaceById,
    deleteSpaceById,
    addDeviceToSpace,
    removeDeviceFromSpace
}