{
  //method to do submit form data using ajax
  let createPost = function (param) {
    let newPost = $("#new-post-form");
    newPost.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPost.serialize(),
        success: function (data) {
          let newPost = newPostDOM(data.data.post);
          $("#post-container").prepend(newPost);
          deletePost($(".delete-post-button", newPost));
        },
        error: function (error) {
          console.error(error.responseText);
        },
      });
    });
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
      </div>
  `);
  }
  createPost();
  //method to do post in DO
  const postElements = document.querySelectorAll(".delete-post-button");
  postElements.forEach(deletePost);
  function deletePost(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-and-comment-${data.data.post_id}`).remove();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}
