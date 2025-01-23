import { useGetMyOfferedCourseQuery } from "../../redux/features/student/courseApi";
import { Card, Collapse, List, Typography, Spin } from "antd";
import { TGroupedCourse } from "../../types/offeredCourse.type";

const { Panel } = Collapse;
const { Title, Text } = Typography;

export default function OfferedCourse() {
  const { data: offeredCourseData, isLoading } =
    useGetMyOfferedCourseQuery(undefined);

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
  // console.log(groupedCourse);
  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Offered Courses</Title>
      <Collapse accordion>
        {groupedCourse?.map((course) => (
          <Panel
            header={
              <>
                <Text strong>
                  {course.title} ({course.prefix} {course.code})
                </Text>{" "}
                - {course.credits} Credits
              </>
            }
            key={course.title}
          >
            <List
              itemLayout="vertical"
              dataSource={course.sections}
              renderItem={(section) => (
                <List.Item key={section._id}>
                  <Card
                    title={`Section ${section.section}`}
                    bordered={true}
                    hoverable
                    style={{ marginBottom: "10px" }}
                  >
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
                </List.Item>
              )}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
