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
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import Input from "antd/es/input/Input";
import { useParams } from "react-router";
import {
  useGetAllStudentQuery,
  useUpdateStudentByIdMutation,
} from "../../../redux/features/admin/userManagmentApi";

export default function StudentUpdate() {
  const { studentId } = useParams();
  const [updateStudentById] = useUpdateStudentByIdMutation();

  const { data: studentData } = useGetAllStudentQuery(undefined);

  const findByIdStudentData = studentData?.data?.find(
    (student) => student._id === studentId
  );

  const studentDefaultValue = findByIdStudentData
    ? {
        name: {
          firstName: findByIdStudentData.name?.firstName || "",
          middleName: findByIdStudentData.name?.middleName || "",
          lastName: findByIdStudentData.name?.lastName || "",
        },
        gender: findByIdStudentData.gender || "",
        dateOfBirth: findByIdStudentData?.dateOfBirth
          ? new Date(findByIdStudentData?.dateOfBirth)
          : null,
        email: findByIdStudentData.email || "",
        contactNo: findByIdStudentData.contactNo || "",
        emergencyContactNo: findByIdStudentData.emergencyContactNo || "",
        bloogGroup: findByIdStudentData.bloogGroup || "",
        presentAddress: findByIdStudentData.presentAddress || "",
        permanentAddress: findByIdStudentData.permanentAddress || "",
        guardian: {
          fatherName: findByIdStudentData.guardian?.fatherName || "",
          fatherOccupation:
            findByIdStudentData.guardian?.fatherOccupation || "",
          fatherContactNo: findByIdStudentData.guardian?.fatherContactNo || "",
          motherName: findByIdStudentData.guardian?.motherName || "",
          motherOccupation:
            findByIdStudentData.guardian?.motherOccupation || "",
          motherContactNo: findByIdStudentData.guardian?.motherContactNo || "",
        },
        localGuardian: {
          name: findByIdStudentData.localGuardian?.name || "",
          occupation: findByIdStudentData.localGuardian?.occupation || "",
          contactNo: findByIdStudentData.localGuardian?.contactNo || "",
          address: findByIdStudentData.localGuardian?.address || "",
        },
        admissionSemester: findByIdStudentData.admissionSemester?._id || "",
        academicDepartment: findByIdStudentData.academicDepartment?._id || "",
        academicFaculty: findByIdStudentData.academicFaculty?._id || "",
      }
    : {}; // Default empty object if no data is found

  // * semister data query give to options
  const { data: semisterData, isLoading: sIsloading } =
    useGetAllSemesterQuery(undefined);
  // * department data query give to options
  const { data: depatrmentData, isLoading: dIsloading } =
    useGetAllAcademicDepartmentQuery(undefined);

  // * academic faculty data query give to options
  const { data: academicFacultyData, isLoading: fIsloading } =
    useGetAllAcademicFacultiesQuery(undefined);

  // * semister data options
  const semisterOptions = semisterData?.data?.map((options) => ({
    value: options._id,
    label: `${options.name}-${options.year}`,
  }));
  // * department data options
  const departmentOptions = depatrmentData?.data?.map((options) => ({
    value: options._id,
    label: options.name,
  }));
  // * department data options
  const academicFacultyOptions = academicFacultyData?.data?.map((options) => ({
    value: options._id,
    label: options.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");

    const studentData = {
      id: studentId,
      student: { ...data },
    };
    try {
      const res = (await updateStudentById(
        studentData
      )) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Student update successfully", {
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
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValue}>
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
                disabled={sIsloading}
                label="Admission Semester"
                options={semisterOptions}
              />
            </Col>
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
                options={academicFacultyOptions}
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
