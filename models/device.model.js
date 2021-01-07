const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    state: { type: Number, required: true, min: 0, max: 1, default: 0 },
    value: { type: Number },
    type: {
        type: String,
        enum: [
            "Air Conditioning",
            "Blind",
            "Boiler",
            "Eletric Gate",
            "Eletric Lock",
            "EV Charging Station",
            "Light",
            "Radiator",
            "Solar Panel"
        ],
        required: true
    },
    isFavorite: { type: Boolean, required: true, default: false },
    readings: [{
        datetime: { type: Date },
        value: { type: Number }
    }]
}, {
    timestamps: true
});

const Device = mongoose.model("device", deviceSchema);

module.exports = Device;