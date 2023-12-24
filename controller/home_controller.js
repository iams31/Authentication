module.exports.home = function (req, res) {
  console.log(req.cookie);
  return res.render("home", {
    title: "Home",
  });
};

// module.exports.actionName = function(req, res){}
