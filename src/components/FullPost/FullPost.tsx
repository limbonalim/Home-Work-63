import React from 'react';
import {Post} from '../../types';

interface Props {
  post: Post;
}

const FullPost: React.FC<Props> = ({post}) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <span>Created in: {post.dateTime}</span>
    </div>
  );
};

export default FullPost;