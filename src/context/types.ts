import { FinancingFormValues } from "@src/types";

export interface FormContextType {
  formValues: FinancingFormValues | null;
  setFormValues: React.Dispatch<
    React.SetStateAction<FinancingFormValues | null>
  >;
}
