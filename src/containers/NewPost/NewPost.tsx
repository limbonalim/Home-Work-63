import React from 'react';
import AddForm from '../../components/AddForm/AddForm';
import axiosApi from '../../axios-api';
import {FormPost, Post} from '../../types';

interface Props {
  onChange: () => void;
}

const NewPost:React.FC<Props> = ({onChange}) => {
  const onSubmit = async (post: FormPost) => {
    const newPost: Post = {...post, dateTime: new Date().toISOString()};
    try {
      await axiosApi.post('/posts.json', newPost);
    } catch (error: Error) {
      console.log(error);
    }
    onChange();
  };
  return (
    <div>
      <h1>Add new post!</h1>
      <AddForm onSubmit={onSubmit}/>
    </div>
  );
};

export default NewPost;