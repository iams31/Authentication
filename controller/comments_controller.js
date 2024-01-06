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
    } else {
      console.log("Post not found", req.body.post);
    }
    return res.redirect("back");
  } catch {
    console.log("Error in finding the creating a post");
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
    return res.redirect("back");
  } catch {
    res.redirect(500).send("Error while sending comment");
  }
};
