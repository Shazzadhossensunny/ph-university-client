import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";

const nameOptions = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summer",
  },
  {
    value: "03",
    label: "Fall",
  },
];

export default function CreateAcademicSemester() {
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <div>
            <br />
            <PHSelect label="Name" name="name" options={nameOptions} />
          </div>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
