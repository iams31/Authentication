const User = require("../models/user");
const Post = require("../models/posts");

module.exports.profile = async function (req, res) {
  try {
    const posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          // Add a comma here ->
          path: "user",
        },
      });

    const users = await User.findById(req.params.id);
    res.render("user_profile", {
      title: "User Profile",
      user: req.user,
      posts,
      curr_user: users,
    });
  } catch {
    console.log("Error while finding the post to print");
  }
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
module.exports.create = async function (req, res) {
  //TODO Late
  if (req.body.password !== req.body.confirmPassword) {
    console.log("Password didn't match");
    return res.redirect("back");
  }
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    if (!user) {
      await User.create(req.body); // Create user if not found
      return res.redirect("/users/sign-in");
    } else {
      console.log("User already found");
    }
    return res.redirect("back");
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
module.exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.password == req.body.password) {
      await User.updateOne(
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
      );
      return res.redirect("/users/profile");
    } else {
      return res.redirect("/");
    }
  } catch {
    console.log("Error while finding the user for updating the user");
  }
};
