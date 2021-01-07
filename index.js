require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

const utilities = require('./utilities/utilities')

const auth = function(req, res, next) {
    let exceptions = ['/signup', '/signin', '/api-docs']; 
    if(exceptions.indexOf(req.url) >= 0) {
        next();
    } else {
        utilities.validateToken(req.headers.authorization, (result) => {
            if(result) {
                next(); 
            } else {
                res.status(401).send("Invalid Token"); 
            }
        })
    }
}


app.use(express.json());
app.use(auth);
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