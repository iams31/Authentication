const User = require("../models/user");
const Post = require("../models/posts");

module.exports.profile = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        // Add a comma here ->
        path: "user",
      },
    })
    .then((posts) => {
      res.render("user_profile", {
        title: "User Profile",
        user: req.user,
        posts,
      });
    })
    .catch((err) => {
      console.log("Error while finding the post to print");
    });
};
//render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Chat | Sign Up",
  });
};

//render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
  return res.redirect("/users/profile");
};
module.exports.distroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log("Error encountred while logging out");
    } else {
      return res.redirect("/users/sign-in");
    }
  });
};
