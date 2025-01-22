import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

export default function Login() {
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0005",
  //     password: "admin12345",
  //   },
  // });

  const defaultValuse = {
    id: "2028010001",
    password: "123456",
  };
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };

      const result = await login(userInfo).unwrap();
      const user = verifyToken(result.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: result.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      if (result?.data?.needsPasswordChange) {
        return navigate("/changePassword");
      }
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
    // toast.dismiss(toastId);
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValuse}>
          <div>
            <PHInput type="text" name="id" label="ID" />
          </div>
          <div>
            <PHInput type="text" name="password" label="Password" />
          </div>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
