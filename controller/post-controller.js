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
          //.id is used to convert the object to string this is default functionality that mongoose provide us
          post.remove();
          Comment.deleteMany({ post: req.params.id }).catch((err) => {
            res.redirect("back");
          });
        }
      } else {
        res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("Error while finding the post in deleting the post");
    });
};
