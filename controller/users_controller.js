const User = require("../models/user");

module.exports.profile = function (req, res) {
  const routePath = new URL(req.headers.referer).pathname;
  if (routePath !== "/users/sign-in") {
    return res.redirect("/users/sign-in");
  }
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id)
      .then((user) => {
        if (user) {
          res.render("user_profile", {
            title: "User Profile",
            name: user.firstname + " " + user.lastname,
            phone: user.phone,
            email: user.email,
          });
        } else {
          res.render("/users/sign-in");
        }
      })
      .catch((error) => {
        console.log("Error in catching the user data", error);
      });
  } else {
    return res.redirect("/users/sign-in");
  }
};
//render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Baatein | Sign Up",
  });
};

//render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Chat | Sign In",
  });
};
//create an user
module.exports.create = function (req, res) {
  //TODO Late
  if (req.body.password !== req.body.confirmPassword) {
    return res.redirect("back");
  }
  try {
    User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    })
      .then((user) => {
        if (!user) {
          return User.create(req.body); // Create user if not found
        } else {
          return Promise.resolve(user); // Return existing user
        }
      })
      .then((createdUser) => {
        res.redirect("/users/sign-in");
      })
      .catch((error) => {
        res.redirect("back");
        // Handle the error appropriately, e.g., send an error response
      });
  } catch (error) {
    // Catch any errors outside the Promise chain
    console.error("Unexpected error:", error);
  }
};
module.exports.createSession = function (req, res) {
  //find the user
  try {
    User.findOne({ email: req.body.username })
      .then((user) => {
        if (user) {
          //session creation
          if (user.password == req.body.password) {
            res.cookie("user_id", user.id);
            res.redirect("/users/profile");
          } else {
            res.redirect("back");
          }
        } else {
          res.render("/user/sign-up");
        }
      })
      .catch((error) => {
        console.log("Error Occcured", error);
      });
  } catch (error) {
    console.error("Error occured", error);
  }
};
module.exports.signOut = function (req, res) {
  console.log(req.cookies.user_id);
  res.clearCookie("user_id", {
    path: "/",
    expires: new Date(0),
  });
  res.redirect("/users/sign-in");
};
