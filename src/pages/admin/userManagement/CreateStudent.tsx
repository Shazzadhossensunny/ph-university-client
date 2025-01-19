import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";

const defaultStudent = {
  password: "defaultPassword123",
  student: {
    name: {
      firstName: "First Name",
      middleName: "Middle Name",
      lastName: "Last Name",
    },
    gender: "not specified", // Default can be 'not specified'
    dateOfBirth: "2000-01-01", // Default date
    email: "example@student.com",
    contactNo: "000-000-0000",
    emergencyContactNo: "000-000-0000",
    bloodGroup: "O+", // Default blood group
    presentAddress: "Default Present Address",
    permanentAddress: "Default Permanent Address",
    guardian: {
      fatherName: "Father Name",
      fatherOccupation: "Father Occupation",
      fatherContactNo: "000-000-0000",
      motherName: "Mother Name",
      motherOccupation: "Mother Occupation",
      motherContactNo: "000-000-0000",
    },
    localGuardian: {
      name: "Local Guardian Name",
      occupation: "Local Guardian Occupation",
      contactNo: "000-000-0000",
      address: "Default Local Guardian Address",
    },
    admissionSemester: "defaultSemesterId", // Placeholder for semester ID
    academicDepartment: "defaultDepartmentId", // Placeholder for department ID
  },
};

export default function CreateStudent() {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultStudent}>
          <Row gutter={16}>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect name="gender" label="Gender" options={} />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
