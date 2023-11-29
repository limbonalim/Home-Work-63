import React from 'react';
import {Outlet} from 'react-router-dom';
import MemoShortPost from '../../components/ShortPost/ShortPost';
import {ApiPost} from '../../types';

interface Props {
  posts: ApiPost[];
}

const Home: React.FC<Props> = ({posts}) => {

  const listOfPosts = posts.map((post: ApiPost) => (
    <MemoShortPost
      key={post.id}
      dateTime={post.dateTime}
      title={post.title}
      id={post.id}
    />
  ));

  return (
    <div className="d-flex gap-2">
      <div className="d-flex gap-2 flex-column-reverse w-100">
        {listOfPosts}
      </div>
      <Outlet/>
    </div>

  );
};

export default Home;