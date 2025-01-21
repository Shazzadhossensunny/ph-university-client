import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";

import { semesterRegistrationStatusOptions } from "../../../constants/global";

import { toast } from "sonner";
import { TResponse } from "../../../types";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagementApi";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";

export default function SemesterRegistration() {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const { data: semesterData, isLoading: sIsloading } = useGetAllSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  const semesterOptions = semesterData?.data?.map((options) => ({
    value: options._id,
    label: `${options.name}-${options.year}`,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    const semesterRegData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await addSemesterRegistration(
        semesterRegData
      )) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Semester Registration successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            disabled={sIsloading}
            options={semesterOptions}
          />
          <PHSelect
            label="Status"
            name="status"
            options={semesterRegistrationStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="number" name="minCredit" label="Min Credit" />
          <PHInput type="number" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
