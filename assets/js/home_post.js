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
          $("#post-container>.post-and-comment").prepend(newPost);
        },
        error: function (error) {
          console.error(error.responseText);
        },
      });
    });
  };
  function newPostDOM(post) {
    return $(`<div class="post-card" id="post-${post.id}">
        <div class="user-info">
          <div style="display: flex; align-items: center">
            <img
              src="https://img.nowrunning.com/content/Artist/SunnyLeone/stills/sunnyleone-stills-02.jpg"
              alt="<%= post.user.firstname %> <%= post.user.lastname%>"
            />
            <span>${post.user.firstname} ${post.user.lastname}</span>
          </div>
          <div id="delete-icon">
            
            <a id="delete-post-button" href="/posts/destroy/${post._id}"
              ><img
                src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png"
                alt="deletepost"
            /></a>
          </div>
        </div>
        <div class="post-content">${post.content}</div>
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
  createPost();
  //method to do post in DOM
}
