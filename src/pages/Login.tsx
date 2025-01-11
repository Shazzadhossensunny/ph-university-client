import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [login, { data, error }] = useLoginMutation();

  console.log("data =>", data);
  console.log("error =>", error);

  const onSubmit = (data) => {
    console.log(data);
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    login(userInfo);
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
