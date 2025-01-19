import { useParams } from "react-router";
import { useGetStudentByIdQuery } from "../../../redux/features/admin/userManagmentApi";
import { Card, Col, Descriptions, Image, Row } from "antd";

export default function StudentDetails() {
  const { studentId } = useParams();
  const { data: student, isLoading, error } = useGetStudentByIdQuery(studentId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Unable to fetch student details.</p>;
  return (
    <Card
      title={`Student Details - ${student?.fullName}`}
      bordered={false}
      style={{ maxWidth: 1200, margin: "20px auto", padding: 20 }}
    >
      <Row gutter={[16, 16]}>
        {/* Profile Image */}
        <Col xs={24} sm={8} md={6}>
          <Card bordered={false} style={{ textAlign: "center" }}>
            {student?.profileImg ? (
              <Image
                src={student.profileImg}
                alt={student.fullName}
                width={150}
                height={150}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <div
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "#f0f0f0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Image
              </div>
            )}
          </Card>
        </Col>

        {/* Personal Details */}
        <Col xs={24} sm={16} md={18}>
          <Descriptions
            title="Personal Information"
            bordered
            column={{ xs: 1, sm: 2, md: 3 }}
          >
            <Descriptions.Item label="Full Name">
              {student?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {student?.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {new Date(student?.dateOfBirth as string).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {student?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Contact No">
              {student?.contactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Emergency Contact">
              {student?.emergencyContactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Blood Group">
              {student?.bloogGroup}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      {/* Address and Guardian Details */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12}>
          <Descriptions title="Address" bordered column={1}>
            <Descriptions.Item label="Present Address">
              {student?.presentAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Permanent Address">
              {student?.permanentAddress}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24} sm={12}>
          <Descriptions title="Guardian Information" bordered column={1}>
            <Descriptions.Item label="Father's Name">
              {student?.guardian.fatherName}
            </Descriptions.Item>
            <Descriptions.Item label="Father's Occupation">
              {student?.guardian.fatherOccupation}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Name">
              {student?.guardian.motherName}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Occupation">
              {student?.guardian.motherOccupation}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      {/* Academic Details */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24}>
          <Descriptions title="Academic Information" bordered column={2}>
            <Descriptions.Item label="Admission Semester">
              {student?.admissionSemester?.name}
              {student?.admissionSemester?.year}
            </Descriptions.Item>
            <Descriptions.Item label="Academic Department">
              {student?.academicDepartment?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Academic Faculty">
              {student?.academicFaculty?.name}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}
