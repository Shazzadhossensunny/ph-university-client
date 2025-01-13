import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Login() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0005",
      password: "admin12345",
    },
  });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="id">ID</label>
          <br />
          <input
            type="text"
            placeholder="type id here"
            id="id"
            {...register("id")}
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="text"
            placeholder="type password here"
            id="password"
            {...register("password")}
          />
        </div>
        <br />
        <Button htmlType="submit">Submit</Button>
      </form>
    </div>
  );
}
