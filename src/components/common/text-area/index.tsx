import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { TextAreaProps } from "./types";

const MAX_CHAR_LIMIT = 150;

const Textarea = ({ name, label, ...rest }: TextAreaProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  const value = useWatch({ name, control }) || "";
  const charCount = value?.length;
  const isOverLimit = charCount > MAX_CHAR_LIMIT;

  useEffect(() => {
    const el = textareaRef?.current;
    if (el) {
      const checkOverflow = () => {
        setHasScrollbar(el?.scrollHeight > el?.clientHeight);
      };
      checkOverflow();
      // Optional: re-check on resize
      window?.addEventListener("resize", checkOverflow);
      return () => window?.removeEventListener("resize", checkOverflow);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor={name} className="font-semibold text-sm">
        {label}
      </label>
      <div className="relative">
        <textarea
          {...register(name)}
          {...rest}
          ref={(e) => {
            textareaRef.current = e;
            register(name)?.ref(e);
          }}
          className="border px-3 py-2 rounded-md resize-y overflow-x-auto border-2 border-border-gray w-full pr-12 pb-6"
          rows={4}
        />
        <span
          className={`absolute bottom-3 ${
            hasScrollbar ? "right-5" : "right-3"
          } text-xs ${
            isOverLimit ? "text-red-600 font-semibold" : "text-gray-400"
          }`}
        >
          {charCount} / {MAX_CHAR_LIMIT}
        </span>
      </div>
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Textarea;
