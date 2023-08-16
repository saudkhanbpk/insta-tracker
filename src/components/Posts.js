import React from 'react';
import './posts.css'
function Posts({ mentioned }) {
  console.log("userMedia posts", mentioned?.mentioned_media?.media_url);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Posts</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <img src={mentioned?.mentioned_media?.media_url} alt={mentioned?.mentioned_media?.caption} />
          <div className="caption">{mentioned?.mentioned_media?.caption}</div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
