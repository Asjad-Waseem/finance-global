import { createContext, useContext, useState, ReactNode } from "react";

import { FinancingFormValues } from "@src/types";
import { FormContextType } from "./types";

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formValues, setFormValues] = useState<FinancingFormValues | null>(
    null
  );
  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
