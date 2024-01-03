const Post = require("../models/posts");
const Comment = require("../models/comment");
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

module.exports.destroy = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        if (post.user == req.user.id) {
          post
            .deleteOne()
            .then(() => {
              Comment.deleteMany({ post: post._id })
                .then(() => {
                  res.redirect("back");
                })
                .catch((err) => {
                  res.status(500).send("Error deleting comments");
                });
            })
            .catch((err) => {
              res.status(500).send("Error deleting post");
            });
        } else {
          res.redirect("back");
        }
      } else {
        res.status(404).send("Post not found");
      }
    })
    .catch((err) => {
      console.log("Error while finding the post in deleting the post");
    });
};
