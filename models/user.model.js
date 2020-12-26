const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    pin: { type: Number },
    phoneList: [{
        type: {
            model: { type: String },
            imei: { type: String, unique: true }
        }
    }],
    floors: [{ type: mongoose.Schema.Types.ObjectId, ref: "floor" }],
    scenes: [{ type: mongoose.Schema.Types.ObjectId, ref: "scene" }]
}, {
    timestamps: true
});

const User = mongoose.model("user", userSchema);

module.exports = User;