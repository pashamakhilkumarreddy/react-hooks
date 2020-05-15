import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import postsService from '../services/PostsService';
import Post from '../components/Post';
import EditPost from '../components/EditPost';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(12);
  const [editPostValue, setEditPostValue] = useState({
    id: null,
    title: '',
    body: ''
  });

  const [showEditModal, toggleEditModalDisplay] = useState(false);

  const toggleEditModal = e => {
    toggleEditModalDisplay(!showEditModal);
  }

  const editedPost = (post) => {
    toggleEditModal();
    if (posts.find(p => p.id === post.id)) {
      const index = posts.findIndex(p => p.id === post.id);
      const updatedPosts = [...posts];
      updatedPosts.splice(index, 1, post);
      setPosts(updatedPosts)
    } else {
      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts);
    }
  }

  const handleOnChange = e => {
    const { value } = e.target;
    if (value) {
      setLimit(parseInt(value, 10));
    }
  }

  const handleOnSubmit = e => {
    try {
      e.preventDefault();
      if (limit) {
        fetchPosts(limit);
      }
    } catch(err) {
      console.error(err);
    }
  }

  const editPost = async (e, post) => {
    try {
      e.preventDefault();
      setEditPostValue(post);
      toggleEditModal();
    } catch (err) {
      console.error(err);
    }
  }

  const deletePost = async (e, id) => {
    try {
      e.preventDefault();
      const isPostDeleted = await postsService.deletePost(id);
      if (isPostDeleted.status === 200 && isPostDeleted.statusText === 'OK') {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const fetchPosts = async (postsLimit = 12) => {
    try {
      const allPosts = await postsService.getPosts(postsLimit);
      if(allPosts.status === 200 && allPosts.statusText === 'OK') {
        const formattedPosts = await allPosts.data;
        setPosts(formattedPosts);
      }
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    {
      editPostValue.id && <EditPost postContent={editPostValue} toggleEditModal={toggleEditModal} editedPost={editedPost} showEditModal={showEditModal} />
    }
    <div className="columns is-mobile is-centered is-vcentered mt-6">
    <div className="column is-8-mobile is-8-tablet is-6-desktop">
      <form action="" onSubmit={handleOnSubmit}>
        <div className="field">
          <label htmlFor="limit-posts" className="label">Limit</label>
          <div className="control">
            <input type="number" name="limit" id="limit-posts" className="input" placeholder="No. of posts to show" value={limit} onChange={handleOnChange} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary">Limit Posts</button>
          </div>
        </div>
      </form>
    </div>
    </div>
    <div className="columns is-mobile is-centered is-vcentered is-multiline posts">
      {
        posts.length ? posts.map((post, index) => <Post post={post} deletePost={deletePost} editPost={editPost} key={index.toString()} />) : (<div className="column is-8-mobile is-8-tablet is-6-desktop"><h1 className="title has-text-centered font-weight-bold mt-10">No Posts!!!</h1></div>)
      }
    </div>

    </>
    
  )
}

export default Home;
