import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import postsService from '../services/PostsService';
import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await postsService.getPosts();
        if(allPosts.status === 200 && allPosts.statusText === 'OK') {
          const formattedPosts = await allPosts.data;
          console.log(formattedPosts);
          setPosts(formattedPosts);
        }
      } catch(err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, [posts]);
  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
      {
        posts.length ? posts.map((post, index) => <Post post={post} key={index.toString()} />) : (<h1 className="title has-text-centered font-weight-bold mt-10">No Posts!!!</h1>)
      }
      
    </>
    
  )
}

export default Home;
