import React from 'react';
import {Link} from 'react-router-dom';
import FormatDate from '../FormatDate/FormatDate';
import {Post} from '../../types';

interface Props {
  post: Post;
}

const MemoFullPost: React.FC<Props> = React.memo(function FullPost({post}) {
  let date = new FormatDate(post.dateTime);
  return (
    <div className="border p-2 rounded col-4">
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <span>Created in: {date.getDate()}</span>
      <div className="d-flex gap-2 my-3">
        <button className="btn btn-outline-danger">Delete</button>
        <Link to="?" className="btn btn-outline-primary">Edit</Link>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (prevProps.post.title === nextProps.post.title && prevProps.post.dateTime === nextProps.post.dateTime);
});

export default MemoFullPost;