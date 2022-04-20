import axios from 'axios';

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5005/api',
      withCredentials: true,
    });
  }

  getAllProjects = credentials => {
    return this.service.get('/projects', credentials);
  };

  getOneProject = id => {
    return this.service.get(`/projects/${id}`);
  };

  createProject = (title, description) => {
    return this.service
      .post(`/projects/new`, {
        title,
        description,
      })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  updateProject = (id, title, description) => {
    return this.service.put(`/projects/${id}`, {
      title,
      description,
    });
  };

  deleteProject = id => {
    return this.service.delete(`/projects/${id}`);
  };

  createNewTask = (projectId, title, description) => {
    return this.service.post(`/tasks/new`, {
      title,
      description,
      projectId,
    });
  };

  deleteTask = (project, _id) => {
    return this.service.delete(`/tasks/${_id}`, {
      data: { project: project },
    });
  };

  signup(credentials) {
    return this.service.post(`/auth/signup`, credentials);
  }

  login(email, password) {
    return this.service.post(`/auth/login`, { email, password });
  }

  isLoggedIn() {
    return this.service.get('/auth/loggedin')
  }
}

const apiService = new Service();
// const authService = new Service2();

export { apiService };

// export { apiService, authService };
