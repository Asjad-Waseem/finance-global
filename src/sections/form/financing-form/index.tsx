import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { getAllCountries } from "@src/api/services/external";
import { submitFinancingRequest } from "@src/api/services/request";
import { showToast } from "@src/utils/toast";

import {
  Input,
  Dropdown,
  DatePicker,
  Textarea,
  CurrencySelector,
  LabelWithAsterisk,
} from "@src/components/common";

import type { FinancingFormValues } from "@src/types";
import { CountryOption, CountryApiResponseItem } from "./types";

const FinancingForm = () => {
  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useFormContext<FinancingFormValues>();
  const [countries, setCountries] = useState<CountryOption[]>([]);

  const watchCountry = watch("country");
  const watchStart = watch("validityStart");
  const watchEnd = watch("validityEnd");

  // Note: This function calcuates the validity period in case if the BE wants the FE to calculate it and send it to the BE.
  const msInYear = 1000 * 60 * 60 * 24 * 365.25;
  const validityPeriodYears = (() => {
    if (!watchStart || !watchEnd) return 0;
    return parseFloat(
      (
        (new Date(watchEnd)?.getTime() - new Date(watchStart)?.getTime()) /
        msInYear
      )?.toFixed(2)
    );
  })();

  const onSubmit = async (values: FinancingFormValues) => {
    const payload = {
      ...values,
      // Note: Added calculated validity period in case if the BE needs it to be sent from the FE.
      validityPeriod: validityPeriodYears,
    };
    try {
      const response = await submitFinancingRequest(payload);
      console.log(response);
      showToast({
        message: "Request submitted successfully!",
        variant: "success",
      });
      reset(); // reset form if submission succeeded
    } catch (error) {
      showToast({
        message: "Submission failed. Please try again.",
        variant: "failure",
      });
    }
  };

  useEffect(() => {
    getAllCountries()?.then((data: CountryApiResponseItem[]) => {
      const countryOptions = data?.map((c) => ({
        name: c?.name?.common,
        code: c?.cca2,
      }));
      setCountries(
        countryOptions?.sort((a: CountryOption, b: CountryOption) =>
          a?.name?.localeCompare(b?.name)
        )
      );
    });
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-6 rounded-lg shadow-md text-start bg-white mt-1"
    >
      <Input
        name="fullName"
        label={<LabelWithAsterisk text="Full Name" />}
        pattern="^(?!\s*$).+"
      />
      <Input
        name="projectCode"
        label={<LabelWithAsterisk text="Project Code (e.g., ABCD-1234)" />}
      />
      <Dropdown
        name="country"
        label={<LabelWithAsterisk text="Country" />}
        placeholder="Select Country"
        options={countries?.map((c) => ({
          label: c?.name,
          value: c?.code,
        }))}
      />
      <CurrencySelector countryCode={watchCountry} />
      <Input
        name="amount"
        label={<LabelWithAsterisk text="Amount Requested" />}
        type="number"
        min={1}
        // Note: "any" string value used in <input step="any"> to allow arbitrary decimal values.
        step="any"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <DatePicker
            name="validityStart"
            label={<LabelWithAsterisk text="Validity Start" />}
          />
          {errors?.validityStart && (
            <p className="text-sm text-red-500 mt-1">
              {errors?.validityStart?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <DatePicker
            name="validityEnd"
            label={<LabelWithAsterisk text="Validity End" />}
          />
          {errors?.validityEnd && (
            <p className="text-sm text-red-500 mt-1">
              {errors?.validityEnd.message}
            </p>
          )}
        </div>
      </div>
      <Textarea
        name="description"
        label={<LabelWithAsterisk text="Description" />}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg hover:cursor-pointer"
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
};

export default FinancingForm;
