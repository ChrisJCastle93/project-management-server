import React, { useState, useEffect } from 'react';
import { apiService } from '../api/service';
import ProjectListItem from './ProjectListItem';

export const ProjectsList = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    apiService
      .getAllProjects()
      .then(projects => setState(projects.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {state.map((project, index) => {
        return (
          <ProjectListItem
            key={index}
            project={project}
          />
        );
      })}
    </div>
  );
};
