const Post = require("../models/posts");
module.exports.home = function (req, res) {
  // console.log(req.cookie);
  //populate the user of each post
  Post.find({})
    .populate("user")
    .then((posts) => {
      res.render("home", {
        title: "Home",
        posts,
      });
    })
    .catch((error) =>
      console.log("Error while finding user and printing in the post with the ")
    );
};

// module.exports.actionName = function(req, res){}
