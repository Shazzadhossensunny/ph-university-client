import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPath } from "./admin.routes";
import { mainRoutesGenerator } from "../utils/routesGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPath } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    // children: adminPath,
    // children: adminRoutes,
    children: mainRoutesGenerator(adminPath),
  },
  {
    path: "/faculty",
    element: <App />,
    children: mainRoutesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: mainRoutesGenerator(studentPath),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
