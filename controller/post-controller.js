const Post = require("../models/posts");
const Comment = require("../models/comment");
module.exports.create = async (req, res) => {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
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
