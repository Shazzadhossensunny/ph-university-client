import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOption } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import Input from "antd/es/input/Input";
import { useParams } from "react-router";
import {
  useGetAllFacultyQuery,
  useUpdateFacultyByIdMutation,
} from "../../../redux/features/admin/userManagmentApi";

export default function FacultyUpdate() {
  const { facultyId } = useParams();
  const [updateFacultyById] = useUpdateFacultyByIdMutation();

  const { data: facultyData } = useGetAllFacultyQuery(undefined);

  const findByIdFacultyData = facultyData?.data?.find(
    (faculty) => faculty?._id === facultyId
  );

  const facultyDefaultValue = findByIdFacultyData
    ? {
        designation: findByIdFacultyData.designation || "",
        name: {
          firstName: findByIdFacultyData.name?.firstName || "",
          middleName: findByIdFacultyData.name?.middleName || "",
          lastName: findByIdFacultyData.name?.lastName || "",
        },
        gender: findByIdFacultyData.gender || "",
        dateOfBirth: findByIdFacultyData?.dateOfBirth
          ? new Date(findByIdFacultyData?.dateOfBirth)
          : null,
        email: findByIdFacultyData.email || "",
        contactNo: findByIdFacultyData.contactNo || "",
        emergencyContactNo: findByIdFacultyData.emergencyContactNo || "",
        bloogGroup: findByIdFacultyData.bloogGroup || "",
        presentAddress: findByIdFacultyData.presentAddress || "",
        permanentAddress: findByIdFacultyData.permanentAddress || "",
        academicDepartment: findByIdFacultyData.academicDepartment?._id || "",
        academicFaculty: findByIdFacultyData.academicFaculty?._id || "",
      }
    : {}; // Default empty object if no data is found

  // * department data query give to options
  const { data: depatrmentData, isLoading: dIsloading } =
    useGetAllAcademicDepartmentQuery(undefined);
  const { data: academicFaculty, isLoading: fIsloading } =
    useGetAllAcademicFacultiesQuery(undefined);

  // * faculty data options
  const facultyOptions = academicFaculty?.data?.map((options) => ({
    value: options._id,
    label: options.name,
  }));
  // * department data options
  const departmentOptions = depatrmentData?.data?.map((options) => ({
    value: options._id,
    label: options.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");

    const facultyData = {
      id: facultyId,
      faculty: { ...data },
    };
    try {
      const res = (await updateFacultyById(
        facultyData
      )) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Faculty update successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={facultyDefaultValue}>
          <Divider orientation="center">Personal Information</Divider>
          <Row gutter={16}>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>
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
                name="bloogGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      {...field}
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      type="file"
                      size={"large"}
                    />
                  </Form.Item>
                )}
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

          <Divider orientation="center">Academic Information</Divider>
          <Row gutter={16}>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                name="academicDepartment"
                disabled={dIsloading}
                label="Academic Department"
                options={departmentOptions}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                name="academicFaculty"
                disabled={fIsloading}
                label="Academic Faculty"
                options={facultyOptions}
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
