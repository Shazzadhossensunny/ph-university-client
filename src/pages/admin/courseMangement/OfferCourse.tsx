import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { dayOptions } from "../../../constants/global";

import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";

import {
  useAddOfferedCourseMutation,
  useGetAllCourseFacultiesQuery,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
} from "../../../redux/features/admin/courseManagementApi";
import PHSelectWatchView from "../../../components/form/PHSelectWatchView";
import { useState } from "react";

export default function OfferCourse() {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useAddOfferedCourseMutation();

  //! here all get data query

  //* registeredSemesterData
  const { data: registeredSemesterData, isLoading: rIsloading } =
    useGetAllRegisteredSemesterQuery(undefined);

  //* academic faculty data
  const { data: academicFacultyData, isLoading: afIsloading } =
    useGetAllAcademicFacultiesQuery(undefined);

  // * academic department data
  const { data: academicDepartmentData, isLoading: dIsloading } =
    useGetAllAcademicDepartmentQuery(undefined);

  // * course data
  const { data: courseData, isLoading: cIsloading } =
    useGetAllCoursesQuery(undefined);

  //* courseId get faculties data
  const { data: courseFacultiesData, isFetching: fetchingFaculties } =
    useGetAllCourseFacultiesQuery(courseId, { skip: !courseId });

  //! here all options create

  //* semesterRegistration options create
  const semesterRegistrationOptions = registeredSemesterData?.data?.map(
    (option) => ({
      value: option._id,
      label: `${option.academicSemester.name}-${option.academicSemester.year}`,
    })
  );

  // * academic faculty data options
  const academicFacultyOptions = academicFacultyData?.data?.map((options) => ({
    value: options._id,
    label: options.name,
  }));
  // * academic department data options
  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (options) => ({
      value: options._id,
      label: options.name,
    })
  );
  // * course data options
  const courseOptions = courseData?.data?.map((options) => ({
    value: options._id,
    label: options.title,
  }));
  // * faculty data options
  const facultyOptions = courseFacultiesData?.data?.faculties?.map(
    (faculty: any) => ({
      value: faculty?._id,
      label: faculty?.fullName,
    })
  );

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
    };

    try {
      const res = (await addOfferedCourse(
        offeredCourseData
      )) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Offered Course create successfully", {
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
        <PHForm onSubmit={onSubmit}>
          <Row gutter={16}>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                name="semesterRegistration"
                label="Semester Registration"
                options={semesterRegistrationOptions}
                disabled={rIsloading}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                name="academicFaculty"
                label="Academic Faculty"
                options={academicFacultyOptions}
                disabled={afIsloading}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={academicDepartmentOptions}
                disabled={dIsloading}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelectWatchView
                onChangeValue={setCourseId}
                name="course"
                label="Course"
                options={courseOptions}
                disabled={cIsloading}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                disabled={!courseId || fetchingFaculties}
                name="faculty"
                label="Faculty"
                options={facultyOptions}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="number" name="section" label="Section" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="number" name="maxCapacity" label="Max-Capacity" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                mode="multiple"
                name="days"
                label="Days"
                options={dayOptions}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="time" name="startTime" label="Start Time" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="time" name="endTime" label="End Time" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
