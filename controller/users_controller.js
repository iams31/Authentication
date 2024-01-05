const User = require("../models/user");
const Post = require("../models/posts");
const passport = require("passport");
const { model } = require("mongoose");

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
      User.findById(req.params.id)
        .then((users) => {
          res.render("user_profile", {
            title: "User Profile",
            user: req.user,
            posts,
            curr_user: users,
          });
        })
        .catch((err) => {
          console.error(
            "Error while fiding current user for rendering profile",
            err
          );
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
  return res.redirect("/");
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
module.exports.updateUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user.password == req.body.password) {
        User.updateOne(
          { _id: req.params.id },
          {
            $set: {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              phone: req.body.phone,
              dob: req.body.dob,
            },
          }
        )
          .then((result) => {
            res.redirect("/");
          })
          .catch((error) => {
            console.log("Error while updating the user");
          });
      } else {
        res.redirect("/");
      }
    })
    .catch(() => {
      console.log("Error while finding the user for updating the user");
    });
};
