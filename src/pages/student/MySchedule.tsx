import { useGetALlMyCourseScheduleQuery } from "../../redux/features/student/courseApi";
import { Card, Col, Row, Typography } from "antd";

const { Title, Text } = Typography;

export default function MySchedule() {
  const { data: scheduleData } = useGetALlMyCourseScheduleQuery(undefined);
  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        My Course Schedule
      </Title>

      {scheduleData?.data?.length > 0 ? (
        <Row gutter={[16, 16]}>
          {scheduleData?.data?.map((schedule: any) => (
            <Col xs={24} sm={24} md={12} lg={8} key={schedule._id}>
              <Card
                bordered
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#fdfdfd",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <Title level={5} style={{ marginBottom: 0 }}>
                    {schedule.course.title} ({schedule.course.credits} Credits)
                  </Title>
                  <Text type="secondary">
                    Academic Semester: {schedule.academicSemester.name}{" "}
                    {schedule.academicSemester.year}
                  </Text>
                </div>
                <div>
                  <Text>
                    <strong>Section:</strong> {schedule.offeredCourse.section}
                  </Text>
                  <br />
                  <Text>
                    <strong>Days:</strong>{" "}
                    {schedule.offeredCourse.days.join(", ")}
                  </Text>
                  <br />
                  <Text>
                    <strong>Time:</strong> {schedule.offeredCourse.startTime} -{" "}
                    {schedule.offeredCourse.endTime}
                  </Text>
                  <br />
                  <Text>
                    <strong>Start Month:</strong>{" "}
                    {schedule.academicSemester.startMonth}
                  </Text>
                  <br />
                  <Text>
                    <strong>End Month:</strong>{" "}
                    {schedule.academicSemester.endMonth}
                  </Text>
                </div>
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
          <Title level={4} style={{ color: "#595959" }}>
            No Scheduled Courses
          </Title>
          <Text type="secondary">
            You currently have no courses in your schedule.
          </Text>
        </div>
      )}
    </div>
  );
}
