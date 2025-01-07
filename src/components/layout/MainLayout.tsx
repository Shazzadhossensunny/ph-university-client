import { Layout, Menu, MenuProps } from "antd";
import { NavLink, Outlet } from "react-router";

const { Header, Content, Footer, Sider } = Layout;
const items: MenuProps["items"] = [
  {
    key: "Dashboard",
    label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
  },
  {
    key: "User Management",
    label: "User Management",
    children: [
      {
        key: "Create Admin",
        label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
      },
      {
        key: "Create Faculty",
        label: <NavLink to="/admin/create-faculty">Create Faculty</NavLink>,
      },
      {
        key: "Create Student",
        label: <NavLink to="/admin/create-student">Create Student</NavLink>,
      },
    ],
  },
];
export default function MainLayout() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
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
          <h1 style={{ color: "#fff" }}>PH-UNIVERSITY</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
