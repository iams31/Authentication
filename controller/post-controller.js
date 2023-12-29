const Post = require("../models/posts");
const User = require("../models/user");
module.exports.create = (req, res) => {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((result) => res.redirect("back"))
    .catch((err) => {
      console.log("Error while creating a user");
      res.redirect("back");
    });
};
