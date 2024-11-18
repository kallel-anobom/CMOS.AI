import { useState, useContext } from 'react';
import { TasksContext } from '../contexts/TasksContext';
import { ProjectsContext } from '../contexts/ProjectsContext';

const TasksPage = () => {
  const [newTask, setNewTask] = useState({ title: '', description: '', projectId: null });
  const { tasks, createTask, updateTask, deleteTask } = useContext(TasksContext);
  const { projects } = useContext(ProjectsContext);

  const handleCreateTask = () => {
    createTask(newTask);
    setNewTask({ title: '', description: '', projectId: null });
  };

  const handleUpdateTask = (task) => {
    updateTask(task);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <select
        value={newTask.projectId}
        onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
      >
        <option value={null}>Select a project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select>
      <button onClick={handleCreateTask}>Create Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Project: {projects.find((p) => p.id === task.projectId)?.title}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleUpdateTask(task)}>Update</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;