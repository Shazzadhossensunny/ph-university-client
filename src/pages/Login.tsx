import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

type TData = {
  id: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "0001",
      password: "admin12345",
    },
  });
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data: TData) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };

    const result = await login(userInfo).unwrap();
    const user = verifyToken(result.data.accessToken);
    dispatch(setUser({ user: user, token: result.data.accessToken }));
    console.error("Login error:", error);
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
