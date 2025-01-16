import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";

export default function CreateAcademicDepartment() {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect label="Name" name="name" options={"hello"} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
