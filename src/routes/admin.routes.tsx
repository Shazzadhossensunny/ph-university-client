/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

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
    ],
  },
];

// Initialize arrays for routes and menu items
export const adminRoutes: { path: string; element: React.ReactNode }[] = [];
export const menuItems: {
  key: string;
  label: React.ReactNode;
  children?: any[];
}[] = [];

// Directly process adminPath2
adminPath.forEach(({ name, path, element, children }) => {
  if (path && element) {
    // Add to routes
    adminRoutes.push({ path, element });

    // Add to menu
    menuItems.push({
      key: path,
      label: name,
    });
  }

  if (children) {
    // Process children directly
    const childMenuItems: { key: string; label: string }[] = [];
    children.forEach((child) => {
      if (child.path && child.element) {
        // Add child routes
        adminRoutes.push({ path: child.path, element: child.element });

        // Add child menu items
        childMenuItems.push({
          key: child.path,
          label: child.name,
        });
      }
    });

    // Add parent menu item with children
    menuItems.push({
      key: name,
      label: name,
      children: childMenuItems,
    });
  }
});

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
