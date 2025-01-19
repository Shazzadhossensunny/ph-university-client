import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOption } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagementApi";

export default function CreateStudent() {
  // * semister data give to options
  const { data: semisterData, isLoading } = useGetAllSemesterQuery(undefined);
  const { data: depatrmentData } = useGetAllAcademicDepartmentQuery(undefined);
  const semisterOptions = semisterData?.data?.map((options) => ({
    value: options._id,
    label: `${options.name}-${options.year}`,
  }));

  const departmentOptions = depatrmentData?.data?.map((options) => ({
    value: options._id,
    label: options.name,
  }));

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const formData = new FormData();
    // formData.append("data", JSON.stringify(data));
    //!this is for development
    //!just for checking
    // console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider orientation="center">Personal Information</Divider>
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
              <PHSelect name="gender" label="Gender" options={genderOption} />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                name="bloodGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
          </Row>

          <Divider orientation="center">Contact Information</Divider>
          <Row gutter={16}>
            <Col span={24} md={12} lg={8}>
              <PHInput type="email" name="email" label="Email" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="contactNo" label="Contact Number" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact Number"
              />
            </Col>
          </Row>

          <Divider orientation="center">Address Information</Divider>
          <Row gutter={16}>
            <Col span={24} md={12}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={12}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Divider orientation="center">Guardian Information</Divider>
          <Row gutter={16}>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father's Name"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father's Occupation"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father's Contact Number"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother's Name"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother's Occupation"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother's Contact Number"
              />
            </Col>
          </Row>

          <Divider orientation="center">Local Guardian Information</Divider>
          <Row gutter={16}>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="localGuardian.name"
                label="Local Guardian Name"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Local Guardian Occupation"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Local Guardian Contact Number"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Local Guardian Address"
              />
            </Col>
          </Row>

          <Divider orientation="center">Academic Information</Divider>
          <Row gutter={16}>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                name="admissionSemester"
                disabled={isLoading}
                label="Admission Semester"
                options={semisterOptions}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                name="academicDepartment"
                disabled={isLoading}
                label="Academic Department"
                options={departmentOptions}
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
