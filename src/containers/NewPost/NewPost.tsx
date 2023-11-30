import React, {useState} from 'react';
import AddForm from '../../components/AddForm/AddForm';
import axiosApi from '../../axios-api';
import {FormPost, Post} from '../../types';
import {useNavigate, useParams} from 'react-router-dom';

interface Props {
  onChange: () => void;
  title?: string;
}

const NewPost: React.FC<Props> = ({onChange, title = 'Add new post!'}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({
    title: '',
    description: '',
    dateTime: '',
  });

  if (params.id) {
    const getPost = async () => {
      try {
        const response = await axiosApi.get<Post>(`/posts/${params.id}.json`);
        setPost(response.data);
      } catch (error: Error) {
        console.log(error);
      }
    };
    void getPost();
  }

  const onSubmit = async (post: FormPost) => {
    try {
      const newPost: Post = {...post, dateTime: new Date().toISOString()};
      await axiosApi.post<Post>('/posts.json', newPost);
      onChange();
      navigate('/');
    } catch (error: Error) {
      console.log(error);
    }
  };

  const onEdit = async (editPost: FormPost) => {
    try {
      const changedPost: Post = {
        ...editPost,
        dateTime: post.dateTime,
      };
      await axiosApi.put<Post>(`/posts/${params.id}.json`, changedPost);
      onChange();
      navigate('/');
    } catch (error: Error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <AddForm onSubmit={onSubmit} onEdit={onEdit} editPost={post}/>
    </div>
  );
};

export default NewPost;