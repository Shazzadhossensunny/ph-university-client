import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import {
  academicDepartmentOptions,
  academicDepartments,
} from "../../../constants/global";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";

export default function CreateAcademicDepartment() {
  const { data: facultiesData } = useGetAllAcademicFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    const selectedDepartment = academicDepartments?.find(
      (department) => department?.name === data?.name
    );
    // console.log(selectedDepartment);
    const associatedFaculty = facultiesData?.data?.find(
      (faculty) => faculty?.name === selectedDepartment?.faculty
    );
    // console.log(associatedFaculty);

    if (!associatedFaculty) {
      return toast.error("This department is not available now!");
    }

    const departmentData = {
      name: data.name,
      academicFaculty: associatedFaculty._id,
    };
    try {
      const response = (await addAcademicDepartment(
        departmentData
      )) as TResponse<FieldValues>;
      if (response.error) {
        toast.error(response?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("successfully create academic department!", {
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
          <PHSelect
            label="Name"
            name="name"
            options={academicDepartmentOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
