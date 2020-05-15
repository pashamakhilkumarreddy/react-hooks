import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ post, editPost, deletePost }) => {
  return (
    <>
      <div className="column is-10-mobile is6-mobile is-3-desktop post">
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{post.title}</p>
                <p className="subtitle is-6">@{post.userId}</p>
              </div>
            </div>
            <div className="content" data-id={post.id}>
              {post.body}
              <br />
              <time dateTime={post.createdAt}>{post.createdAt}</time>
            </div>
          </div>
          <footer className="card-footer">
            <a href="#" className="card-footer-item has-text-link" onClick={(e) => editPost(e, post)} data-id={post.id}>Edit</a>
            <a href="#" className="card-footer-item has-text-danger" onClick={(e) => deletePost(e, post.id)}>Delete</a>
          </footer>
        </div>
      </div>
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

export default Post;
