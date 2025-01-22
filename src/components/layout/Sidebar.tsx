import { Layout, Menu } from "antd";
import { sidebadGeneretor } from "../../utils/sidebarItemGeneretor";
import { adminPath } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPath } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hook";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

export default function Sidebar() {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebadGeneretor(adminPath as any, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebadGeneretor(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebadGeneretor(studentPath, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ position: "sticky", height: "100vh", top: "0", left: "0" }}
    >
      <div
        className="demo-logo-vertical"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "3.75rem",
        }}
      >
        <h1 style={{ color: "#fff" }}>PH-UNI</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
}
