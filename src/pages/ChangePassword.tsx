import { Button, Col, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagmentApi";
import { toast } from "sonner";
import { TResponse } from "../types";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";

export default function ChangePassword() {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in");
    try {
      const res = (await changePassword(data)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Password Change Successfully", {
          duration: 2000,
        });
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!", { duration: 2000 });
    }
    toast.dismiss(toastId);
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <div>
            <PHInput type="text" name="oldPassword" label="Old Password" />
          </div>
          <div>
            <PHInput type="text" name="newPassword" label="New Password" />
          </div>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
