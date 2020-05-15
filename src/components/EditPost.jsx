import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import postsService from '../services/PostsService';

const EditForm = ({ postContent, toggleEditModal, editedPost, showEditModal }) => {
  const [post, setPost] = useState({ title: '', body: '', id: null });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: ''
  });

  useEffect(() => {
    setLoading(false);
    setErrorMessage({
      error: false,
      message: ''
    });
    setPost({
      ...postContent
    });
  }, [postContent]);

  const handleOnChange = e => {
    const { name, value } = e.target;
    if (value) {
      setPost({
        ...post, 
        [name]: value
      })
    }
  }

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      if (post.title && post.body) {
        setLoading(true);
        const isPostEdited = await postsService.editPost(post);
        if (isPostEdited.status === 200 && isPostEdited.statusText.toLowerCase() === 'ok') {
          editedPost(isPostEdited.data);
          setLoading(false);
        }
      }
    } catch(err) {
      console.error(err);
      setErrorMessage({
        error: true,
        message: 'Unable to update the post!!!'
      });
    }
    finally {
    }
  }
  return (
    <>
      <Helmet>
        <title>Edit Post</title>
      </Helmet>
      <div className={'modal ' + (showEditModal ? 'is-active' : '' )}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <form className="edit-post-form" onSubmit={handleOnSubmit}>
            <div className="field">
              <label htmlFor="edit-title" className="label">Title</label>
              <div className="control">
                <input id="edit-title" name="title" type="text" className="input" value={post.title}
                  placeholder="Please enter the Title" onChange={handleOnChange} required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="edit-body" className="label">Body</label>
              <div className="control">
                <input id="edit-body" name="body" type="text" className="input" value={post.body}
                  placeholder="Please enter the Body" onChange={handleOnChange} required />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className={'button is-link ' + (loading ? ' is-loading' : '' )}>Update</button>
              </div>
              <div className="control">
                <span className="button is-link is-light" onClick={toggleEditModal}>Cancel</span>
              </div>
            </div>
            {
              errorMessage.error && <div className="has-text-danger">{errorMessage.message}</div>
            }
          </form>
        </div>
        <button className="modal-close is-large" title="Close Modal" aria-label="close"
          onClick={toggleEditModal}></button>
      </div>
    </>
  )
}

EditForm.propTypes = {
  postContent: PropTypes.object.isRequired,
  editedPost: PropTypes.func.isRequired,
  toggleEditModal: PropTypes.func.isRequired,
  showEditModal: PropTypes.bool.isRequired
}

export default EditForm;