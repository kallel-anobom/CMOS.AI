import { useState, useContext } from 'react';
import { ProjectsContext } from '../contexts/ProjectsContext';

const ProjectsPage = () => {
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const { projects, createProject, updateProject, deleteProject } = useContext(ProjectsContext);

  const handleCreateProject = () => {
    createProject(newProject);
    setNewProject({ title: '', description: '' });
  };

  const handleUpdateProject = (project) => {
    updateProject(project);
  };

  const handleDeleteProject = (projectId) => {
    deleteProject(projectId);
  };

  return (
    <div>
      <h1>Projects</h1>
      <input
        type="text"
        placeholder="Title"
        value={newProject.title}
        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProject.description}
        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
      />
      <button onClick={handleCreateProject}>Create Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button onClick={() => handleUpdateProject(project)}>Update</button>
            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProjectsPage;
