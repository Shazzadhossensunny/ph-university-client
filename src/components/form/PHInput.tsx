import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  placeholder: string;
  label?: string;
};

export default function PHInput({
  type,
  name,
  placeholder,
  label,
}: TInputProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} placeholder={placeholder} />
          </Form.Item>
        )}
      />
    </div>
  );
}
