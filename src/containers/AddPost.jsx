import React, { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';

import postsService from '../services/PostsService';

const AddPost = (props) => {
  const [post, setPost] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(false);

  const handleOnChange = e => {
    const { name, value } = e.target;
    if (value) {
      setPost({
        ...post, 
        [name]: value
      })
    }
  }

  useEffect(() => {
    setPost({
      title: '',
      body: ''
    });
    setLoading(false);
  }, []);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      if (post.title && post.body) {
        setLoading(true);
        const newPost = await postsService.addPost(post);
        if (newPost.status === 201 && newPost.statusText.toLowerCase() === 'created') {
          setLoading(false);
          props.history.push('/posts');
        }
      }
    } catch(err) {
      console.error(err);
    }
  }

  const handleOnClick = e => {
    e.preventDefault();
    setPost({
      title: '',
      body: ''
    });
  }

  return (
    <>
      <Helmet>
        <title>Add Post</title>
      </Helmet>
      <div className="columns is-mobile is-centered is-vcentered mt-6">
        <div className="column is-8-mobile is-7-tablet is-6-desktop">
          <form className="add-post-form" onSubmit={handleOnSubmit}>
            <div className="field">
              <label htmlFor="title" className="label">Title</label>
              <div className="control">
                <input id="title" name="title" type="text" className="input" value={post.title}
                  placeholder="Please enter the Title" onChange={handleOnChange} required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="body" className="label">Body</label>
              <div className="control">
                <input id="body" name="body" type="text" className="input" value={post.body}
                  placeholder="Please enter the Body" onChange={handleOnChange} required />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className={'button is-link ' + (loading ? ' is-loading' : '' )}>Submit</button>
              </div>
              <div className="control">
                <button className="button is-link is-light" onClick={handleOnClick}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddPost;