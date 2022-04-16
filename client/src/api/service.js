import axios from 'axios';

class Service {
  constructor() {
    this.baseUrl = 'http://localhost:5005/api';
  }

  getAllProjects = () => {
    return axios.get(`${this.baseUrl}/projects`);
  };

  getOneProject = id => {
    return axios.get(`${this.baseUrl}/projects/${id}`);
  };

  createProject = (title, description) => {
    axios
      .post(`${this.baseUrl}/projects/new`, {
        title,
        description,
      })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  updateProject = (id, title, description) => {
    return axios.put(`${this.baseUrl}/projects/${id}`, {
      title,
      description,
    });
  };

  deleteProject = id => {
    return axios.delete(`${this.baseUrl}/projects/${id}`);
  };

  createNewTask = (projectId, title, description) => {
    return axios
      .post(`${this.baseUrl}/tasks/new`, {
        title,
        description,
        projectId,
      })
  };

  deleteTask = (project, _id) => {
    return axios.delete(`${this.baseUrl}/tasks/${_id}`, { data: { project: project } })
  };
}

const apiService = new Service();

export { apiService };
