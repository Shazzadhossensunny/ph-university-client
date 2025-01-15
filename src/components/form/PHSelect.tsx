import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelect = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

export default function PHSelect({ label, name, options }: TPHSelect) {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select {...field} style={{ width: "100%" }} options={options} />
        </Form.Item>
      )}
    />
  );
}
