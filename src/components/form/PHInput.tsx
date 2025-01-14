import { Input } from "antd";
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
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => (
          <Input {...field} type={type} id={name} placeholder={placeholder} />
        )}
      />
    </div>
  );
}
