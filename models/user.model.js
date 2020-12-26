const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    pin: { type: Number },
    phoneList: [{
        type: {
            model: { type: String },
            imei: { type: String }
        }
    }],
    floorsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "floor" }],
    scenesIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "scene" }]
}, {
    timestamps: true
});

const User = mongoose.model("user", userSchema);

module.exports = User;