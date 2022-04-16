import React, { useState } from 'react';
import { apiService } from '../api/service';

export default function NewProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = e => {
    const { value } = e.target;
    setTitle(value);
  };
  const handleDescriptionChange = e => {
    const { value } = e.target;
    setDescription(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    apiService.createProject(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h2>New Projects</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          id=""
          onChange={handleTitleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={description}
          id=""
          onChange={handleDescriptionChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
