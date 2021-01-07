const mongoose = require("mongoose");

const sceneSchema = new mongoose.Schema({
    name: { type: String, required: true },
    datetimeToStart: { type: Date, required: true },
    datetimeToFinish: { type: Date },
    devices: [{
        device: { type: mongoose.Schema.Types.ObjectId, ref: "device" },
        stateOnStart: { type: Number, required: true, min: 0, max: 1 },
        valueOnStart: { type: Number },
        stateOnFinish: { type: Number, min: 0, max: 1 },
        valueOnFinish: { type: Number }
    }]
}, {
    timestamps: true
});

const Scene = mongoose.model("scene", sceneSchema);

module.exports = Scene;