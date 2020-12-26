const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            "Attic",
            "Basement",
            "First Floor",
            "Ground Floor",
            "Outdoors",
            "Second Floor"
        ],
        required: true
    },
    spaces: [{
        type: {
            name: { type: String, required: true },
            type: {
                type: String,
                enum: [
                    "Back Yard",
                    "Bathroom",
                    "Bedroom",
                    "Dining Room",
                    "Front Yard",
                    "Garage",
                    "Garden",
                    "Hallway",
                    "Kitchen",
                    "Laundry Room",
                    "Living Room",
                    "Office",
                    "Pantry",
                    "Roof"
                ],
                required: true
            },
            devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "device" }]
        }
    }]
}, {
    timestamps: true
});

const Floor = mongoose.model("floor", floorSchema);

module.exports = Floor;