const Comment = require("../models/comment");
const Post = require("../models/posts");
module.exports.create = (req, res) => {
  Post.findById(req.body.post)
    .then((post) => {
      if (post) {
        Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        })
          .then((result) => {
            post.comments.push(result);
            post.save();
            res.redirect("back");
          })
          .catch((err) => {
            console.log("Error while creating a comment");
            res.redirect("back");
          });
      } else {
        res.redirect("/users/sign-up");
      }
    })
    .catch((err) => {
      console.log("Error in finding the user");
      res.redirect("back");
    });
};
