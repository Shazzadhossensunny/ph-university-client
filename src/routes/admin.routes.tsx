import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculties from "../pages/admin/academicManagement/AcademicFaculties";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculties from "../pages/admin/academicManagement/CreateAcademicFaculties";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import StudentData from "../pages/admin/userManagement/StudentData";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";

export const adminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculties",
        path: "create-academic-faculties",
        element: <CreateAcademicFaculties />,
      },
      {
        name: "Academic Faculties",
        path: "academic-faculties",
        element: <AcademicFaculties />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "students-data",
        element: <StudentData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },

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
    ],
  },
];

//* Generate dynamic Routes
// export const adminRoutes: TRoute[] = [];

// // Directly process adminPath
// adminPath.forEach(({ path, element, children }) => {
//   if (path && element) {
//     // Add to routes
//     adminRoutes.push({ path, element });
//   }

//   if (children) {
//     children.forEach(({ path: childPath, element: childElement }) => {
//       if (childPath && childElement) {
//         adminRoutes.push({ path: childPath, element: childElement });
//       }
//     });
//   }
// });

//* Generate dynamic Menu Items
// export const adminSideBarItems: TSidebarItems[] = [];
// adminPath.forEach(({ name, path, children }) => {
//   if (path) {
//     adminSideBarItems.push({
//       key: path,
//       label: <NavLink to={`/admin/${path}`}>{name}</NavLink>,
//     });
//   }

//   if (children) {
//     const childMenuItems: TSidebarItems[] = [];
//     children.forEach(({ name: childName, path: childPath }) => {
//       if (childPath) {
//         childMenuItems.push({
//           key: childPath,
//           label: <NavLink to={`/admin/${childPath}`}>{childName}</NavLink>,
//         });
//       }
//     });

//     adminSideBarItems.push({
//       key: name,
//       label: name,
//       children: childMenuItems,
//     });
//   }
// });

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
