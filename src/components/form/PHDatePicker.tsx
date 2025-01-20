import { DatePicker, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";

type TDatePickerProps = {
  name: string;
  label?: string;
};

export default function PHDatePicker({ name, label }: TDatePickerProps) {
  const { control } = useFormContext();
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              value={field.value ? moment(field.value) : null}
              onChange={(date) => field.onChange(date)}
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
}
