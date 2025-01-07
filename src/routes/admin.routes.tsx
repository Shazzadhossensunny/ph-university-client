import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import { NavLink } from "react-router";

type TRoute = {
  path: string;
  element: ReactNode;
};

type TSidebarItems = {
  key: string;
  label: ReactNode;
  children?: TSidebarItems[];
};

export const adminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create Member",
        path: "create-member",
        element: <CreateStudent />,
      },
    ],
  },
];

//* Generate dynamic Routes
export const adminRoutes: TRoute[] = [];

// Directly process adminPath
adminPath.forEach(({ path, element, children }) => {
  if (path && element) {
    // Add to routes
    adminRoutes.push({ path, element });
  }

  if (children) {
    children.forEach(({ path: childPath, element: childElement }) => {
      if (childPath && childElement) {
        adminRoutes.push({ path: childPath, element: childElement });
      }
    });
  }
});

//* Generate dynamic Menu Items
export const adminSideBarItems: TSidebarItems[] = [];
adminPath.forEach(({ name, path, children }) => {
  if (path) {
    adminSideBarItems.push({
      key: path,
      label: <NavLink to={`/admin/${path}`}>{name}</NavLink>,
    });
  }

  if (children) {
    const childMenuItems: TSidebarItems[] = [];
    children.forEach(({ name: childName, path: childPath }) => {
      if (childPath) {
        childMenuItems.push({
          key: childPath,
          label: <NavLink to={`/admin/${childPath}`}>{childName}</NavLink>,
        });
      }
    });

    adminSideBarItems.push({
      key: name,
      label: name,
      children: childMenuItems,
    });
  }
});

//! hardcode routes
// export const adminPath = [
//   {
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
// ];
