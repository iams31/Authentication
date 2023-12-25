const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersConrtoller = require("../controller/users_controller");

router.get("/profile", passport.checkAuthentication, usersConrtoller.profile);
router.get("/sign-up", usersConrtoller.signUp);
router.get("/sign-in", usersConrtoller.signIn);
router.post("/create", usersConrtoller.create);
//the router function will take 3 argument a path ,middleware,the action controller
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in",
  }),
  usersConrtoller.createSession
);
router.get("/sign-out", usersConrtoller.distroySession);
module.exports = router;
