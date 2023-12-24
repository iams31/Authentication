const express = require("express");

const router = express.Router();
const homeController = require("../controller/home_controller");

console.log("router loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

module.exports = router;
