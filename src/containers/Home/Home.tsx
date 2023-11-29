import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {ApiPost, Post} from '../../types';
import axiosApi from '../../axios-api.ts';
import ShortPost from '../../components/Post/ShortPost.tsx';

interface Props {
  getListOfPosts: (posts: ApiPost[]) => void;
}

const Home: React.FC<Props> = ({getListOfPosts}) => {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const getPosts = async () => {
    try {
      const posts = await axiosApi.get<Post[]>('/posts.json');
      const listOfPosts: ApiPost[] = [];
      for (let post in posts.data) {
        const apiPost: ApiPost = {
          ...posts.data[post],
          id: post,
        };
        listOfPosts.push(apiPost);
      }
      getListOfPosts(listOfPosts);
      setPosts(listOfPosts);
    } catch (error: Error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void getPosts();
  }, []);

  const listOfPosts = posts.map((post: ApiPost) => (
    <ShortPost
      key={post.id}
      dateTime={post.dateTime}
      title={post.title}
      id={post.id}
    />
  ));

  return (
    <div className="d-flex gap-2 flex-column-reverse">
      {listOfPosts}
      <Outlet/>
    </div>
  );
};

export default Home;