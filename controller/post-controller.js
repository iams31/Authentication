const Post = require("../models/posts");
const Comment = require("../models/comment");
module.exports.create = async (req, res) => {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch {
    console.log("Error in creating user");
    return res.redirect(500).send("Please create post again");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.user == req.user.id) {
        await post.deleteOne();
        await Comment.deleteMany({ post: post._id });
      } else {
        console.log("Login in from your account");
      }
    } else {
      console.log("Post not found in database");
    }
    return res.redirect("back");
  } catch {
    console.log("Error while deleting the post");
  }
};
