import { useParams } from "react-router";
import { useGetFacultyByIdQuery } from "../../../redux/features/admin/userManagmentApi";
import { Card, Col, Descriptions, Image, Row } from "antd";

export default function FacultyDetails() {
  const { facultyId } = useParams();
  const { data: faculty, isLoading, error } = useGetFacultyByIdQuery(facultyId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Unable to fetch student details.</p>;
  return (
    <Card
      title={`Faculty Details - ${faculty?.fullName || "N/A"}`}
      bordered={false}
      style={{ maxWidth: 1200, margin: "20px auto", padding: 20 }}
    >
      <Row gutter={[16, 16]}>
        {/* Profile Image Section */}
        <Col xs={24} sm={8} md={6}>
          <Card bordered={false} style={{ textAlign: "center" }}>
            {faculty?.profileImg ? (
              <Image
                src={faculty.profileImg}
                alt={faculty.fullName || "Faculty Image"}
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
                  fontSize: 14,
                  color: "#aaa",
                }}
              >
                No Image
              </div>
            )}
          </Card>
        </Col>

        {/* Personal & Designation Details */}
        <Col xs={24} sm={16} md={18}>
          <Descriptions
            title="Personal Information"
            bordered
            column={{ xs: 1, sm: 2, md: 3 }}
          >
            <Descriptions.Item label="Full Name">
              {faculty?.fullName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Designation">
              {faculty?.designation || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {faculty?.gender || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {faculty?.dateOfBirth
                ? new Date(faculty.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {faculty?.email || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Contact No">
              {faculty?.contactNo || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Emergency Contact">
              {faculty?.emergencyContactNo || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Blood Group">
              {faculty?.bloogGroup || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      {/* Address Details */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12}>
          <Descriptions title="Address" bordered column={1}>
            <Descriptions.Item label="Present Address">
              {faculty?.presentAddress || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Permanent Address">
              {faculty?.permanentAddress || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      {/* Academic Details */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24}>
          <Descriptions
            title="Academic Information"
            bordered
            column={{ xs: 1, sm: 2 }}
          >
            <Descriptions.Item label="Academic Department">
              {faculty?.academicDepartment?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Academic Faculty">
              {faculty?.academicFaculty?.name || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}
