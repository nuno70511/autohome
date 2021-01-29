const Scene = require("../models/scene.model");
const Device = require("../models/device.model");
const { idNotFoundError, conflictError } = require("../util/errorObjects");

const projection = "_id name datetimeToStart datetimeToFinish devices";

const createScene = async (req, res, next) => {
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

const findAllScenes = async (req, res, next) => {
    try {
        const scenes = await Scene.find({}, projection);

        res.status(200).json(scenes);
    }
    catch (err) {
        next(err);
    }
}

const findSceneById = async (req, res, next) => {
    try {
        const scene = await Scene.findById(req.params.sceneId, projection).exec();
        if (!scene)
            next(idNotFoundError("scene"));

        res.status(200).json(scene);
    }
    catch (err) {
        next(err);
    }
}

const updateSceneById = async (req, res, next) => {
    try {
        const scene = await Scene.findById(req.params.sceneId).exec();
        if (!scene)
            next(idNotFoundError("scene"));

        await Scene.findByIdAndUpdate(req.params.sceneId, {
            ...req.body.name                && { name: req.body.name                            },
            ...req.body.datetimeToStart     && { datetimeToStart: req.body.datetimeToStart      },
            ...req.body.datetimeToFinish    && { datetimeToFinish: req.body.datetimeToFinish    }
        }).exec();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const deleteSceneById = async (req, res, next) => {
    try {
        const scene = await Scene.findByIdAndDelete(req.params.sceneId).exec();
        if (!scene)
            next(idNotFoundError("scene"));

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const scheduleActivity = async (req, res, next) => {
    try {
        const scene = await Scene.findById(req.params.sceneId).exec();
        if (!scene)
            next(idNotFoundError("scene"));

        const device = await Device.findById(req.body.deviceId).exec();
        if (!device)
            next(idNotFoundError("device"));

        if (scene.devices.find(d => d._id === req.body.deviceId))
            next(conflictError("device", "deviceId"))

        scene.devices.push({
            device: req.body.deviceId,
            stateOnStart: req.body.stateOnStart,
            ...req.body.valueOnStart    && { valueOnStart: req.body.valueOnStart    },
            ...req.body.stateOnFinish   && { stateOnFinish: req.body.stateOnFinish  },
            ...req.body.valueOnFinish   && { valueOnFinish: req.body.valueOnFinish  },
        });
        await scene.save();

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

const updateActivity = async (req, res, next) => {
    try {
        const scene = await Scene.findById(req.params.sceneId).exec();
        if (!scene)
            next(idNotFoundError("scene"));

        const deviceIndex = scene.devices.findIndex(d => d._id === req.body.deviceId);
        if (deviceIndex === -1)
            next(idNotFoundError("device"))

        scene.devices[deviceIndex] = {
            device: req.body.deviceId,
            stateOnStart: req.body.stateOnStart,
            ...req.body.valueOnStart    && { valueOnStart: req.body.valueOnStart    },
            ...req.body.stateOnFinish   && { stateOnFinish: req.body.stateOnFinish  },
            ...req.body.valueOnFinish   && { valueOnFinish: req.body.valueOnFinish  }
        };
        await scene.save();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const cancelActivity = async (req, res, next) => {
    try {
        const scene = await Scene.findById(req.params.sceneId).exec();
        if (!scene)
            next(idNotFoundError("scene"));

        if (!scene.devices.find(d => d._id === req.params.deviceId))
            next(idNotFoundError("device"))

        scene.devices = scene.devices.filter(d => d._id !== req.params.device);
        await scene.save();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    createScene,
    findAllScenes,
    findSceneById,
    updateSceneById,
    deleteSceneById,
    scheduleActivity,
    updateActivity,
    cancelActivity
}