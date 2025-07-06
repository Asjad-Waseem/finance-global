import { ReactNode } from "react";

export interface DatePickerProps {
  name: string;
  label: ReactNode;
  min?: string;
  max?: string;
}
