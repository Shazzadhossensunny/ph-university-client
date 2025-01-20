import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOption } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import Input from "antd/es/input/Input";
import { useParams } from "react-router";
import {
  useGetAllAdminQuery,
  useUpdateAdminByIdMutation,
} from "../../../redux/features/admin/userManagmentApi";

export default function AdminUpdate() {
  const { adminId } = useParams();
  const [updateAdminById] = useUpdateAdminByIdMutation();

  const { data: adminData } = useGetAllAdminQuery(undefined);

  const findByIdAdminData = adminData?.data?.find(
    (admin) => admin?._id === adminId
  );

  const adminDefaultValue = findByIdAdminData
    ? {
        designation: findByIdAdminData.designation || "",
        name: {
          firstName: findByIdAdminData.name?.firstName || "",
          middleName: findByIdAdminData.name?.middleName || "",
          lastName: findByIdAdminData.name?.lastName || "",
        },
        gender: findByIdAdminData.gender || "",
        dateOfBirth: findByIdAdminData?.dateOfBirth
          ? new Date(findByIdAdminData?.dateOfBirth)
          : null,
        email: findByIdAdminData.email || "",
        contactNo: findByIdAdminData.contactNo || "",
        emergencyContactNo: findByIdAdminData.emergencyContactNo || "",
        bloogGroup: findByIdAdminData.bloogGroup || "",
        presentAddress: findByIdAdminData.presentAddress || "",
        permanentAddress: findByIdAdminData.permanentAddress || "",
      }
    : {}; // Default empty object if no data is found

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");

    const adminData = {
      id: adminId,
      admin: { ...data },
    };
    try {
      const res = (await updateAdminById(adminData)) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Admin update successfully", {
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
        <PHForm onSubmit={onSubmit} defaultValues={adminDefaultValue}>
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
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
