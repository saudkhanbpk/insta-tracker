import React from 'react';
import './posts.css'
function Posts({ userMedia }) {
  console.log("userMedia posts", userMedia);
  return (
    <div className="container">
      <div className="row">
        {userMedia.data?.map((post, index) => {
          console.log("post", post);
          return (
            <div className="col-4" key={index}>
              <div className="post">
                <img src={post.media_url} alt={post.caption} className="post-image" />
                <div className="caption">{post.caption}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Posts;
