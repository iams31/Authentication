const Post = require("../models/posts");
const User = require("../models/user");
module.exports.home = function (req, res) {
  // console.log(req.cookie);
  //populate the user of each post

  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((posts) => {
      User.find({}).then((users) => {
        res.render("home", {
          title: "Home",
          posts,
          all_users: users,
        });
      });
    })
    .catch((error) =>
      console.log("Error while finding user and printing in the post with the ")
    );
};

// module.exports.actionName = function(req, res){}
