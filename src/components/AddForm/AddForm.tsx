import React, {ChangeEvent, FormEvent, useState} from 'react';
import {FormPost} from '../../types';

interface Props {
  onSubmit: (post: FormPost) => void;
}

const AddForm: React.FC<Props> = ({onSubmit}) => {
  const [post, setPost] = useState<FormPost>({
    // dateTime: new Date().toString(),
    title: '',
    description: '',
  });

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(post);
    setPost(prevState => ({
      title: '',
      description: ''
    }))
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setPost(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            onChange={onChange}
            value={post.title}
            required
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Title"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            onChange={onChange}
            value={post.description}
            required
            name="description"
            className="form-control"
            id="description"
            placeholder="Description"
            rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-outline-primary">Add</button>
      </form>
    </div>
  );
};

export default AddForm;