import { useParams } from "react-router";
import { useGetAdminByIdQuery } from "../../../redux/features/admin/userManagmentApi";
import { Card, Col, Descriptions, Image, Row } from "antd";

export default function AdminDetails() {
  const { adminId } = useParams();
  const { data: admin, isLoading, error } = useGetAdminByIdQuery(adminId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Unable to fetch student details.</p>;
  return (
    <Card
      title={`Admin Details - ${admin?.fullName}`}
      bordered={false}
      style={{ maxWidth: 1200, margin: "20px auto", padding: 20 }}
    >
      {/* Profile Image Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8} md={6}>
          <Card bordered={false} style={{ textAlign: "center" }}>
            {admin?.profileImg ? (
              <Image
                src={admin.profileImg}
                alt={admin.fullName}
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

        {/* Personal Details Section */}
        <Col xs={24} sm={16} md={18}>
          <Descriptions
            title="Personal Information"
            bordered
            column={{ xs: 1, sm: 2, md: 3 }}
          >
            <Descriptions.Item label="Full Name">
              {admin?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Designation">
              {admin?.designation}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {admin?.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {new Date(admin?.dateOfBirth as string).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{admin?.email}</Descriptions.Item>
            <Descriptions.Item label="Contact No">
              {admin?.contactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Emergency Contact">
              {admin?.emergencyContactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Blood Group">
              {admin?.bloogGroup}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      {/* Address Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12}>
          <Descriptions title="Address" bordered column={1}>
            <Descriptions.Item label="Present Address">
              {admin?.presentAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Permanent Address">
              {admin?.permanentAddress}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}
