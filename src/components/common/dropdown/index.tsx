import { useFormContext } from "react-hook-form";

import { SelectProps } from "./types";

const Dropdown = ({
  name,
  label,
  options,
  placeholder,
  ...rest
}: SelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold text-sm">
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        {...rest}
        className="border px-3 py-2 pr-4 rounded-md bg-white border-grayBorder"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt?.value} value={opt?.value}>
            {opt?.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
