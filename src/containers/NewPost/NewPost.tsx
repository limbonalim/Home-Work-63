import React from 'react';
import AddForm from '../../components/AddForm/AddForm.tsx';
import axiosApi from '../../axios-api.ts';
import {FormPost, Post} from '../../types';

const NewPost = () => {
  const onSubmit = async (post: FormPost) => {
    const newPost: Post = {...post, dateTime: new Date().toISOString()};
    try {
      await axiosApi.post('/posts.json', newPost);
      console.log(newPost);
    } catch (error: Error) {
      console.log(error);
    }

  };
  return (
    <div>
      <h1>Add new post!</h1>
      <AddForm onSubmit={onSubmit}/>
    </div>
  );
};

export default NewPost;