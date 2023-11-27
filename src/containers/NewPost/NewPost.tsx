import React from 'react';
import AddForm from '../../components/AddForm/AddForm.tsx';
import {FormPost, Post} from '../../types';

const NewPost = () => {
  const onSubmit = (post: FormPost) => {
    const newPost: Post = {...post, dateTime: new Date().toISOString()};
    console.log(newPost);
  };
  return (
    <div>
      <h1>Add new post!</h1>
      <AddForm onSubmit={onSubmit}/>
    </div>
  );
};

export default NewPost;