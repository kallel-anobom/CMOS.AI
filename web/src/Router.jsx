import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { TasksProvider } from './contexts/TasksContext';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <ProjectsProvider>
          <TasksProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<PrivateRoute />}>
                {routes
                  .flatMap((layout) => layout.pages)
                  .map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Route>
            </Routes>
          </TasksProvider>
        </ProjectsProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
