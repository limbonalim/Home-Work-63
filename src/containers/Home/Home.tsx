import React, {useEffect, useState} from 'react';
import {ApiPost, Post} from '../../types';
import axiosApi from '../../axios-api.ts';
import ShorPost from '../../components/Post/ShorPost.tsx';

const Home = () => {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const getPosts = async () => {
    try {
      const posts = await axiosApi.get<Post>('/posts.json');
      const listOfPosts: ApiPost[] = [];
      for (let post in posts.data) {
        const apiPost: ApiPost = {
          ...posts.data[post],
          id: post,
        };
        listOfPosts.push(apiPost);
      }
      setPosts(listOfPosts);
    } catch (error: Error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void getPosts();
  }, []);

  const listOfPosts = posts.map((post) => (
    <ShorPost
      key={post.id}
      dateTime={post.dateTime}
      title={post.title}
    />
  ));

  return (
    <div className="d-flex gap-2 flex-column-reverse">
      {listOfPosts}
    </div>
  );
};

export default Home;