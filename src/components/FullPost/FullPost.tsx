import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import FormatDate from '../FormatDate/FormatDate';
import {Post} from '../../types';
import axiosApi from '../../axios-api';

interface Props {
  post: Post;
  onChange: () => void;
  getError: (message: string) => void;
}

const MemoFullPost: React.FC<Props> = React.memo(function FullPost({post, onChange, getError}) {
  const navigate = useNavigate();
  let date = new FormatDate(post.dateTime);

  const onDelete = async () => {
    try {
      await axiosApi.delete(`/posts/${post.id}.json`);
      navigate('/');
      onChange();
    } catch (error: Error) {
      getError(error.message);
    }
  };

  const editPost: string = `/posts/${post.id}/edit`;

  return (
    <div className="border p-2 rounded col-6">
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <span>Created on: {date.getDate()}</span>
      <div className="d-flex gap-2 my-3">
        <button
          onClick={onDelete}
          className="btn btn-outline-danger"
        >Delete
        </button>
        <Link to={editPost} className="btn btn-outline-primary">Edit</Link>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (prevProps.post.title === nextProps.post.title && prevProps.post.dateTime === nextProps.post.dateTime);
});

export default MemoFullPost;