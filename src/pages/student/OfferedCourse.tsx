import {
  useEnrollCourseMutation,
  useGetMyOfferedCourseQuery,
} from "../../redux/features/student/courseApi";
import { Card, Col, Row, Button, Typography, Spin, Empty } from "antd";
import { TGroupedCourse } from "../../types/offeredCourse.type";
import { toast } from "sonner";
import { TResponse } from "../../types";
import { FieldValues } from "react-hook-form";

const { Title, Text } = Typography;

export default function OfferedCourse() {
  const { data: offeredCourseData, isLoading } =
    useGetMyOfferedCourseQuery(undefined);

  const [enrollCourse] = useEnrollCourseMutation();

  // Handle loading
  if (isLoading) return <Spin tip="Loading courses..." />;

  const groupedCourse: TGroupedCourse[] = [];
  offeredCourseData?.data?.forEach((course) => {
    const { course: courseDetails, section, ...rest } = course;
    //check if this course title already exists in the groupedCourse array
    const existingCourse = groupedCourse.find(
      (item) => item.title === courseDetails.title
    );
    if (existingCourse) {
      existingCourse.sections.push({
        section,
        faculty: course.faculty,
        days: course.days,
        startTime: course.startTime,
        endTime: course.endTime,
        maxCapacity: course.maxCapacity,
        _id: course._id,
      });
    } else {
      // If not, create a new entry for this course
      groupedCourse.push({
        title: courseDetails.title,
        prefix: courseDetails.prefix,
        code: courseDetails.code,
        credits: courseDetails.credits,
        sections: [
          {
            section,
            faculty: course.faculty,
            days: course.days,
            startTime: course.startTime,
            endTime: course.endTime,
            maxCapacity: course.maxCapacity,
            _id: course._id,
          },
        ],
      });
    }
  });

  const handleEnroll = async (id: string) => {
    const enrollCourseData = {
      offeredCourse: id,
    };
    try {
      const res = (await enrollCourse(
        enrollCourseData
      )) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error?.data?.message);
      } else {
        toast.success("Enroll successfully");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    toast.dismiss();
  };
  return (
    <div style={{ padding: "20px" }}>
      {groupedCourse.length > 0 ? (
        <Row gutter={[16, 16]}>
          {groupedCourse.map((course) => (
            <Col xs={24} sm={24} md={12} lg={8} key={course.title}>
              <Card
                title={
                  <div>
                    <Title level={5}>{course.title}</Title>
                    <Text type="secondary">
                      {course.prefix} {course.code} | Credits: {course.credits}
                    </Text>
                  </div>
                }
                bordered={true}
                style={{ borderRadius: "8px", overflow: "hidden" }}
              >
                {course.sections.map((section) => (
                  <Card
                    key={section._id}
                    type="inner"
                    title={`Section ${section.section}`}
                    style={{ marginBottom: "10px" }}
                    extra={
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => handleEnroll(section._id)}
                      >
                        Enroll
                      </Button>
                    }
                  >
                    <p>
                      <strong>Faculty:</strong> {section.faculty}
                    </p>
                    <p>
                      <strong>Days:</strong> {section.days.join(", ")}
                    </p>
                    <p>
                      <strong>Time:</strong> {section.startTime} -{" "}
                      {section.endTime}
                    </p>
                    <p>
                      <strong>Max Capacity:</strong> {section.maxCapacity}
                    </p>
                  </Card>
                ))}
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "50px 20px",
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div>
                <Title level={4} style={{ color: "#595959" }}>
                  No Offered Courses Available
                </Title>
                <Text type="secondary">
                  Please check back later for updates on available courses.
                </Text>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
