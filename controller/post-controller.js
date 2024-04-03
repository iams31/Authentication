const Post = require("../models/posts");
const Comment = require("../models/comment");
module.exports.create = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post created",
      });
    }
    req.flash("success", "Post created Successfully!");
    return res.redirect("back");
  } catch {
    req.flash("error", "Error in creating post!!");
    return res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.user == req.user.id) {
        await post.deleteOne();
        await Comment.deleteMany({ post: post._id });
        req.flash("success", "Post Deleted Successfully!");
      } else {
        req.flash("error", "Login First!!");
      }
    } else {
      req.flash("error", "Post not found in database!");
    }
    return res.redirect("back");
  } catch {
    req.flash("error", err);
    return res.redirect("back");
  }
};
