import { Button, Layout } from "antd";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hook";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;

export default function MainLayout() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            paddingRight: "40px",
          }}
        >
          <Button onClick={handleLogout}>Logout</Button>
        </Header>

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
      </Layout>
    </Layout>
  );
}
