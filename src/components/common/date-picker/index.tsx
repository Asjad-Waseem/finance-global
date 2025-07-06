import { useFormContext, Controller } from "react-hook-form";

import { DatePickerProps } from "./types";

const DatePicker = ({ name, label, min, max }: DatePickerProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold text-sm">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="date"
            {...field}
            min={min}
            max={max}
            className="border px-3 py-2 rounded-md border-2 border-border-gray"
          />
        )}
      />
    </div>
  );
};

export default DatePicker;
