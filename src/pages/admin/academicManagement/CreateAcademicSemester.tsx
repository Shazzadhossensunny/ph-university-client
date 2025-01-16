import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import { nameOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
//!advance dynamic
// const generateYearOptions = (range = 5) => {
//   const currentYear = new Date().getFullYear();
//   return Array.from({ length: range + 1 }, (_, index) => {
//     const year = currentYear + index;
//     return {
//       value: String(year),
//       label: String(year),
//       disabled: year < currentYear, // Disable years in the past
//     };
//   });
// };

// const yearOptions = generateYearOptions();

export default function CreateAcademicSemester() {
  const [addAcademicSemester, { reset }] = useAddAcademicSemesterMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    const selectedOption = nameOptions.find(
      (option) => option.value === data.name
    );
    const semesterData = {
      name: selectedOption?.label || "Unknown",
      code: selectedOption?.value || "Unknown",
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Academic semester create successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
    reset();
  };

  const academicSemesterSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    year: z.string({ required_error: "Year is required" }),
    startMonth: z.string({ required_error: "Start Month is required" }),
    endMonth: z.string({ required_error: "End Month is required" }),
  });

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={nameOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
