{
  function showNoty(type, message) {
    new Noty({
      theme: "relax",
      text: message,
      type: type,
      layout: "topRight",
      timeout: 1500,
    }).show();
  }
  //method to do submit form data using ajax
  let createPost = function (element) {
    let newPost = $(element);
    let fun = function () {
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPost.serialize(),
        success: function (data) {
          let newPost = newPostDOM(data.data.post);
          $("#post-container").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
          showNoty("success", data.message);
        },
        error: function (error) {
          showNoty("error", "Cant add the post");
          console.error(error.responseText);
        },
      });
    };
    fun();
  };
  function newPostDOM(post) {
    return $(`
      <div class="post-and-comment" id="post-and-comment-${post._id}">
        <div class="post-card" id="post-${post._id}">
            <div class="user-info">
              <div style="display: flex; align-items: center">
                <img
                  src="https://img.nowrunning.com/content/Artist/SunnyLeone/stills/sunnyleone-stills-02.jpg"
                  alt="${post.user.firstname} ${post.user.lastname}"
                />
                <span>${post.user.firstname} ${post.user.lastname}</span>
              </div>
              <div id="delete-icon">
                <a class="delete-post-button" href="/posts/destroy/${post._id}"
                  ><img
                    src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png"
                    alt="deletepost"
                /></a>
              </div>
            </div>
            <div class="post-content">${post.content}</div>
        </div>
        <div class="comment-form">
          <form id="comment-form" action="/comments/create" method="post">
            <textarea name="content" cols="27" rows="3" required></textarea>
            <input type="hidden" name="post" value="<%=post._id %>" />
            <button type="submit">comment</button>
          </form>
        </div>
      </div>
  `);
  }
  //method to do post in DO
  $(document).ready(function () {
    $("#new-post-form").on("submit", function (e) {
      e.preventDefault();
      let form = $(this);
      createPost(form);
    });
  });
  //deleting post
  const elements = document.querySelectorAll(" .delete-post-button");
  elements.forEach((buttons) => {
    deletePost(buttons);
  });
  function deletePost(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-and-comment-${data.data.post_id}`).remove();
          showNoty("success", data.message);
        },
        error: function (error) {
          showNoty("error", "Can't delete the post");
          console.log(error.responseText);
        },
      });
    });
  }
  //for adding comment using AJAX
  $(document).ready(function () {
    $(".comment-form form").on("submit", function (e) {
      e.preventDefault();
      let form = $(this);
      addComment(form);
    });
  });
  function addComment(element) {
    let newComment = $(element);
    let fun = function (e) {
      $.ajax({
        type: "post",
        url: "/comments/create",
        data: newComment.serialize(),
        success: function (data) {
          let commentDOM = newcommmentDOM(data.data.comment, data.data.post_id);
          $(`#post-and-comment-${data.data.post_id}>.cmnt-bx`).prepend(
            commentDOM
          );
          deleteComment($("a", newComment));
          showNoty("success", data.message);
        },
      });
    };
    fun();
  }
  function newcommmentDOM(comment) {
    return $(`
        <div class="post-comment">
            <div id="comment-card">
                <span id="comment-name">
                <div style="display: flex; align-items: center">
                    <img
                    src="https://img.nowrunning.com/content/Artist/SunnyLeone/stills/sunnyleone-stills-02.jpg"
                    alt="${comment.user.firstname} ${comment.user.lastname}"
                    />
                    ${comment.user.firstname} ${comment.user.lastname}
                </div>
                <div class="del-cmnt-btn">
                    <a id="del-cmnt-btn-${comment._id}"  href="/comments/destroy/${comment._id}"
                    ><img
                        src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png"
                        alt="deletepost"
                    /></a>
                </div>
                </span>
                <span id="comment-content">${comment.content}</span>
            </div>
        </div>
    `);
  }
  //deleting the comment
  let cmnteles = document.querySelectorAll(" .del-cmnt-btn a");
  cmnteles.forEach((buttons) => {
    deleteComment(buttons);
  });
  function deleteComment(link) {
    $(link).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: $(link).prop("href"),
        success: function (data) {
          $(`#post-comment-${data.data.comment_id}`).remove();
          showNoty("success", "Comment Deleted Successfully");
        },
        error: function (error) {
          showNoty("error", "Comment cant be deleted");
          console.log(error.responseText);
        },
      });
    });
  }
}
