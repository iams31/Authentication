const express = require("express");
const router = express.Router();

const usersConrtoller = require("../controller/users_controller");

router.get("/profile", usersConrtoller.profile);
router.get("/sign-up", usersConrtoller.signUp);
router.get("/sign-in", usersConrtoller.signIn);
router.post("/create", usersConrtoller.create);
module.exports = router;
