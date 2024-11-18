import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { ProjectsContext } from './ProjectsContext';
import { AuthContext } from './AuthContext'; // Importa o AuthContext para acessar o usuário

export const TasksContext = createContext();

// eslint-disable-next-line react/prop-types
export const TasksProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Obtenha o usuário do contexto de autenticação
  const [tasks, setTasks] = useState([]);
  const { projects } = useContext(ProjectsContext);

  useEffect(() => {
    // Só faz a requisição se o usuário estiver autenticado
    if (user) {
      const fetchTasks = async () => {
        try {
          const response = await api.get('/tasks');
          setTasks(response.data);
        } catch (error) {
          console.error('Erro ao buscar tarefas:', error);
        }
      };
      fetchTasks();
    }
  }, [user, projects]); // Executa quando `user` ou `projects` mudam

  const createTask = async (task) => {
    const response = await api.post('/tasks', task);
    setTasks([...tasks, response.data]);
  };

  const updateTask = async (task) => {
    const response = await api.put(`/tasks/${task.id}`, task);
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, ...response.data } : t))
    );
  };

  const deleteTask = async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <TasksContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
