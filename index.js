require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", require("./routes/auth.route"));
app.use("/devices", require("./routes/device.route"));
app.use("/floors", require("./routes/floor.route"));
app.use("/scenes", require("./routes/scene.route"));
app.use("/users", require("./routes/user.route"));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err);
});

(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@autohome.qlmex.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB Atlas");
    }
    catch (err) {
        console.log(err);
    }
})();

app.listen(port, () => {
    console.log(`AutoHome app listening on port ${port}`);
});