import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,

} from "@heroicons/react/24/solid";
import { Home } from "./pages/Dashboard/";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import Dashboard from "./components/Dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "project",
        path: "/project",
        element: <ProjectsPage />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "task",
        path: "/task",
        element: <TasksPage />,
      },
    ],
  },
];

export default routes;