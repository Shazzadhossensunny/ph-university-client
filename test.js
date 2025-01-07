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

// const processAdminPath = (paths) => {};

// Initialize arrays for routes and menu items
export const adminRoutes = [];
const menuItems = [];

// Directly process adminPath2
adminPath2.forEach(({ name, path, element, children }) => {
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
    const childMenuItems = [];
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
      children: JSON.stringify(childMenuItems),
    });
  }
});
console.log(adminRoutes);
console.log(menuItems);
