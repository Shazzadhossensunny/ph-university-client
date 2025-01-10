import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPath } from "./admin.routes";
import { mainRoutesGenerator } from "../utils/routesGenerator";

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
    children: mainRoutesGenerator(adminPath),
  },
  {
    path: "/student",
    element: <App />,
    children: mainRoutesGenerator(adminPath),
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
