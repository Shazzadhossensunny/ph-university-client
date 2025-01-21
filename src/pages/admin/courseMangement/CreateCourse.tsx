import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TPreRequisiteCourse, TResponse } from "../../../types";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";

export default function CreateCourse() {
  const [addCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const preRequisiteCoursesOptions = courses?.data?.map((option) => ({
    value: option._id,
    label: option.title,
  }));
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses?.map(
        (item: TPreRequisiteCourse) => ({
          course: item,
          isDeleted: false,
        })
      ),
    };

    console.log(courseData);

    try {
      const res = (await addCourse(courseData)) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Course create successfully", {
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
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="number" name="code" label="Code" />
          <PHInput type="number" name="credits" label="Credits" />
          <PHSelect
            mode="multiple"
            label="PreRequisite Courses"
            name="preRequisiteCourses"
            options={preRequisiteCoursesOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
