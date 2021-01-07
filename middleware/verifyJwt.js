const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers["authorization"];
        const token = authorizationHeader && authorizationHeader.replace("Bearer ", "");

        if (!token) {
            res.status(401).end();
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req._id = decoded._id;

        next();
    }
    catch (err) {
        next(err);
    }
}

module.exports = verifyJwt;