const express = require("express");
const controller = require("../controllers/floor.controller");

const router = express.Router();

router.get("/", (req, res, next) => {
    controller.findAll(req, res, next);
});

router.post("/", (req, res, next) => {
    controller.createOne(req, res, next);
});

/*router.put("/floors/:floorId/spaces/:name/devices", (req,res,next) => {
    controller.naoseioqporaqui(req,res,next)
});
*/

router.get("/:floorId", (req, res, next) => {
    controller.findOneById(req, res, next);
});

router.delete("/:floorId", (req, res, next) => {
    controller.deleteOneById(req, res, next);
});




module.exports = router;