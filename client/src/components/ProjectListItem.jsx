import React from 'react';
import { Link } from 'react-router-dom'

export default function ProjectListItem(props) {
  const { project } = props;
  return (
    <div>
      <h1>Title: {project.title}</h1>
      <h1>Description: {project.description}</h1>
      <Link to={`/projects/${project._id}`}>GO TO PROJECT</Link>
    </div>
  );
}
