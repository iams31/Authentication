//authentication using passport

const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            console.log("Invalid Username Coorect it");
            done(null, false);
          } else if (user.password != password) {
            console.log("Invalid password");
            done(null, false);
          } else {
            done(null, user);
          }
        })
        .catch((err) => {
          console.log("Error in finding user-->Passport");
          done(err);
        });
    }
  )
);
//serialising the user to decide which key is kept in the cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialising user from the key in the cookie
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      console.log("Error in finding user->Passport");
      done(err);
    });
});

//check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  //if user is signed is  pass the user to constroller
  if (req.isAuthenticated()) {
    return next();
  }
  //if user is not signed in
  return res.redirect("/users/sign-in");
};
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    //req.user contains the current sign in user from the session cookie we are just sending them to local of the views
    res.local.user = req.user;
  }
  next();
};
module.export = passport;
