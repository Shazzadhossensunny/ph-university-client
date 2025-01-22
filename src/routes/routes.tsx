import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPath } from "./admin.routes";
import { mainRoutesGenerator } from "../utils/routesGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPath } from "./student.routes";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import ChangePassword from "../pages/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    // children: adminPath,
    // children: adminRoutes,
    children: mainRoutesGenerator(adminPath),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <App />
      </ProtectedRoute>
    ),
    children: mainRoutesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <App />
      </ProtectedRoute>
    ),
    children: mainRoutesGenerator(studentPath),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
