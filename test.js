const adminPath2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "ADMIN_DASHBOARD",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "CREATE_ADMIN",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "CREATE_FACULTY",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "CREATE_STUDENT",
      },
    ],
  },
];

// 1. Generate Routes
export const adminRoutes = [];

adminPath2.forEach(({ path, element, children }) => {
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
// 2. Generate Menu Items
const menuItems = [];
adminPath2.forEach(({ name, path, children }) => {
  if (path) {
    menuItems.push({
      key: path,
      label: name,
    });
  }

  if (children) {
    const childMenuItems = [];
    children.forEach(({ name: childName, path: childPath }) => {
      if (childPath) {
        childMenuItems.push({
          key: childPath,
          label: childName,
        });
      }
    });

    menuItems.push({
      key: name,
      label: name,
      children: childMenuItems,
    });
  }
});
