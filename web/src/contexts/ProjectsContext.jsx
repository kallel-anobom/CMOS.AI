import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const ProjectsContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectsProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchProjects = async () => {
        try {
          const response = await api.get('/projects/');
          setProjects(response.data);
        } catch (error) {
          console.error('Erro ao buscar projetos:', error);
        }
      };

      fetchProjects();
    }
  }, [token]);
  
  const createProject = async (project) => {
    const response = await api.post('/projects/', project);
    setProjects([...projects, response.data]);
  };

  const updateProject = async (project) => {
    const response = await api.put(`/projects/${project.id}`, project);
    setProjects(
      projects.map((p) => (p.id === project.id ? { ...p, ...response.data } : p))
    );
  };

  const deleteProject = async (projectId) => {
    await api.delete(`/projects/${projectId}`);
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  return (
    <ProjectsContext.Provider value={{ projects, createProject, updateProject, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};