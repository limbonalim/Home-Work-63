import React from 'react';
import FormatDate from '../FormatDate/FormatDate.ts';

interface Props {
  dateTime: string;
  title: string;
}

const ShorPost:React.FC<Props> = ({dateTime, title}) => {
  const data = new FormatDate(dateTime);
  return (
    <div className="border btn-secondary border-2 rounded p-2">
      <p>Created on: {data.getDate()}</p>
      <span className="d-block my-2 fs-3">{title}</span>
      <button type="button" className="btn btn-secondary">Read more</button>
    </div>
  );
};

export default ShorPost;