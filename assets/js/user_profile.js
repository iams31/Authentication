function ShowAndHide() {
  var x = document.getElementsByClassName("post-comment");
  if (x.style.display == "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
  console.log(x);
}
