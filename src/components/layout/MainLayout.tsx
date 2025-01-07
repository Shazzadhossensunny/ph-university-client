import { Layout, Menu } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    key: "1",
    label: "Dashboard",
  },
  {
    key: "2",
    label: "Admin",
    children: [
      {
        key: "21",
        label: "create-admin",
      },
      {
        key: "22",
        label: "create-faculty",
      },
    ],
  },
  {
    key: "3",
    label: "Faculty",
  },
  {
    key: "",
    label: "Student",
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
            <h1>This is main content</h1>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
