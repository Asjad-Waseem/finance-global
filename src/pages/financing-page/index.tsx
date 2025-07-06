import { FormProvider as RHFormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FinancingFormSchema, defaultValues } from "@src/utils/zodValidator";
import { FormProvider } from "@src/context/FormContext";

import FinancingForm from "@src/sections/form/financing-form";

import type { FinancingFormValues } from "@src/types";

const FinancingPage = () => {
  const form = useForm<FinancingFormValues>({
    defaultValues,
    resolver: zodResolver(FinancingFormSchema),
    mode: "onTouched",
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <FormProvider>
        <RHFormProvider {...form}>
          <div className="max-w-md w-full bg-gray-100 shadow-md p-6 rounded">
            <h1 className="text-2xl font-bold pb-2">Financing Request Form</h1>
            <FinancingForm />
          </div>
        </RHFormProvider>
      </FormProvider>
    </div>
  );
};

export default FinancingPage;
