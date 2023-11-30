import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import {FormPost, Post} from '../../types';

interface Props {
  onSubmit: (post: FormPost) => void;
  onEdit: (editPost: FormPost) => void;
  editPost?: Post;
}

const AddForm: React.FC<Props> = React.memo(({onSubmit, onEdit, editPost}) => {
  const [post, setPost] = useState<FormPost>({
    title: '',
    description: '',
  });

  if (editPost) {
    const getEditPost = useCallback(() => {
      setPost(prevState => {
        return {
          ...prevState,
          title: editPost.title,
          description: editPost.description,
        };
      });
    }, [editPost.title, editPost.description]);

    useEffect(() => {
      void getEditPost();
    }, [getEditPost]);
  }

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (editPost.title.length > 0 && editPost.description.length > 0) {
      onEdit(post);
    } else {
      onSubmit(post);
    }
    setPost({
      title: '',
      description: ''
    });
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
});

export default AddForm;