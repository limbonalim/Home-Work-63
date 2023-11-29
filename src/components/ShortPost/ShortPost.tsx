import React from 'react';
import {NavLink} from 'react-router-dom';
import FormatDate from '../FormatDate/FormatDate';

interface Props {
  id: string;
  dateTime: string;
  title: string;
}

const MemoShortPost: React.FC<Props> = React.memo(function ShortPost({dateTime, title, id}) {
  const data = new FormatDate(dateTime);
  const link = `posts/:${id}`;
  return (
    <div className="border btn-secondary border-2 rounded p-2">
      <p>Created on: {data.getDate()}</p>
      <span className="d-block my-2 fs-3">{title}</span>
      <NavLink
        to={link}
        className="btn btn-secondary"
      >Read more</NavLink>
    </div>
  );
});

export default MemoShortPost;