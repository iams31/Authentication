const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};
//render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Chat | Sign Up",
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
          return res.redirect("/users/sign-up"); // Return existing user
        }
      })
      .then((createdUser) => {
        res.redirect("/users/sign-in");
      })
      .catch((error) => {
        console.log(
          "Error during signup: User exist with the same email or phone try with another phone"
        );
        // Handle the error appropriately, e.g., send an error response
      });
  } catch (error) {
    // Catch any errors outside the Promise chain
    console.error("Unexpected error:", error);
  }
};
module.exports.createSession = function (req, res) {
  //TODO Later
};
