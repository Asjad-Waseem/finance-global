import { SelectHTMLAttributes, ReactNode } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: ReactNode;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
}
