const Comment = require("../models/comment");
const Post = require("../models/posts");
module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
            post_id: post._id,
          },
          message: "You have commented on post!",
        });
      }
    } else {
      req.flash("error", "Post not found");
    }
    return res.redirect("back");
  } catch {
    req.flash("error", "Error in finding the post");
    res.redirect("back");
  }
};
module.exports.destroy = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const postId = comment.post;
    await comment.deleteOne();
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: req.params.id },
    });
    if (req.xhr) {
      return res.status(200).json({
        data: {
          comment_id: req.params.id,
        },
        message: "Comment Deleted Successfully!",
      });
    }
    req.flash("success", "Comment deleted Successfully!");
    return res.redirect("back");
  } catch {
    req.flash("error", "Error while sending comment");
    return res.redirect("back");
  }
};
