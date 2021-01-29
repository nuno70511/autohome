const Device = require("../models/device.model");
const { idNotFoundError } = require("../util/errorObjects");

const projection = "_id name state temperature type isFavorite readings priority maxPowerDraw";

const createDevice = async (req, res, next) => {
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

const findAllDevices = async (req, res, next) => {
    try {
        const devices = await Device.find({}, projection);

        res.status(200).json(devices);
    }
    catch (err) {
        next(err);
    }
}

const findDeviceById = async (req, res, next) => {
    try {
        const device = await Device.findById(req.params.deviceId, projection).exec();
        if (!device)
            next(idNotFoundError("device"));

        res.status(200).json(device);
    }
    catch (err) {
        console.log(err)
        next(err);
    }
}

const updateDeviceById = async (req, res, next) => {
    try {
        const device = await Device.findById(req.params.deviceId).exec();
        if (!device)
            next(idNotFoundError("device"));
        
        await Device.findByIdAndUpdate(req.params.deviceId, {
            ...req.body.name            && { name: req.body.name                },
            ...req.body.state           && { state: req.body.state              },
            ...req.body.temperature     && { temperature: req.body.temperature  },
            ...req.body.isFavorite      && { isFavorite: req.body.isFavorite    },
            ...req.body.priority        && { priority: req.body.priority        },
            ...req.body.maxPowerDraw    && { maxPowerDraw: req.body.maxPowerDraw}
        }).exec();

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const deleteDeviceById = async (req, res, next) => {
    try {
        const device = await Device.findByIdAndDelete(req.params.deviceId).exec();
        if (!device)
            next(idNotFoundError("device"));

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}

const addReading = async (req, res, next) => {
    try {
        const device = await Device.findById(req.params.deviceId).exec();
        if (!device)
            next(idNotFoundError("device"));

        device.readings.push({
            datetime: req.body.datetime,
            value: req.body.value
        });
        await device.save();

        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    createDevice,
    findAllDevices,
    findDeviceById,
    updateDeviceById,
    deleteDeviceById,
    addReading
}