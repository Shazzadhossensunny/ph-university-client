import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
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
    id: "A-0005",
    password: "admin12345",
  };
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();
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
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      console.error("Login error:", error);
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
    // toast.dismiss(toastId);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <PHForm onSubmit={onSubmit} defaultValues={defaultValuse}>
        <div>
          <br />
          <PHInput
            type="text"
            placeholder="type here id"
            name="id"
            label="ID:"
          />
        </div>
        <br />
        <div>
          <br />
          <PHInput
            type="text"
            placeholder="type here password"
            name="password"
            label="Password:"
          />
        </div>
        <br />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </div>
  );
}
