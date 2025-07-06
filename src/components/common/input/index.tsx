import { useFormContext } from "react-hook-form";

import { InputProps } from "./types";

const Input = ({ name, label, ...rest }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold text-sm">
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        {...rest}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ring-indigo-400 border-2 border-border-gray"
      />
      {errors[name] && (
        <p className="text-sm text-red-500">
          {(errors[name]?.message as string) || "Field is required"}
        </p>
      )}
    </div>
  );
};

export default Input;
