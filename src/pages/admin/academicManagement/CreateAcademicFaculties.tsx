import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { facultiesOptions } from "../../../constants/global";
import { useAddAcademicFacultiesMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";

export default function CreateAcademicFaculties() {
  const [createAcademicFaculties] = useAddAcademicFacultiesMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = (await createAcademicFaculties(
        data
      )) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Academic faculty create successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect label="Name" name="name" options={facultiesOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
