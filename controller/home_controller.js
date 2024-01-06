const Post = require("../models/posts");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  // console.log(req.cookie);
  //populate the user of each post

  try {
    const posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    const users = await User.find({});
    return res.render("home", {
      title: "Home",
      posts,
      all_users: users,
    });
  } catch {
    console.log("Error in home constroller");
  }
};

// module.exports.actionName = function(req, res){}
