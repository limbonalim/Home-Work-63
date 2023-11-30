import React, {useCallback, useEffect, useState} from 'react';
import AddForm from '../../components/AddForm/AddForm';
import axiosApi from '../../axios-api';
import {FormPost, Post} from '../../types';
import {useNavigate, useParams} from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

interface Props {
  onChange: () => void;
  getError: (message: string) => void;
  title?: string;
}

const NewPost: React.FC<Props> = ({onChange, getError, title = 'Add new post!'}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({
    title: '',
    description: '',
    dateTime: '',
  });

  if (params.id) {
    const getPost = useCallback(async () => {
      try {
        const response = await axiosApi.get<Post>(`/posts/${params.id}.json`);
        setPost(response.data);
      } catch (error: Error) {
        getError(error.message);
      }
    }, [params.id]);

    useEffect(() => {
      void getPost();
    }, [getPost]);
  }

  const onSubmit = async (post: FormPost) => {
    try {
      setLoading(true);
      const newPost: Post = {...post, dateTime: new Date().toISOString()};
      await axiosApi.post<Post>('/posts.json', newPost);
      onChange();
      navigate('/');
    } catch (error: Error) {
      getError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = async (editPost: FormPost) => {
    try {
      setLoading(true);
      const changedPost: Post = {
        ...editPost,
        dateTime: post.dateTime,
      };
      await axiosApi.put<Post>(`/posts/${params.id}.json`, changedPost);
      onChange();
      navigate('/');
    } catch (error: Error) {
      getError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loading/> :
        <>
          <h1>{title}</h1>
          <AddForm onSubmit={onSubmit} onEdit={onEdit} editPost={post}/>
        </>}
    </>
  );
};

export default NewPost;