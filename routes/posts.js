const express = require("express");
const router = express.Router();
const postController = require("../controller/post-controller");
const passport = require("passport");
router.post("/create", passport.checkAuthentication, postController.create);
module.exports = router;
