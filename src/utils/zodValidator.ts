import { z } from "zod";

import type { FinancingFormValues } from "../types";

export const FinancingFormSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Name is required")
      .refine(
        (value) => value.trim().length > 0,
        "Name cannot be empty or contain only whitespace"
      ),
    country: z.string().min(1, "Country is required"),
    projectCode: z
      .string()
      .regex(/^[A-Z]{4}-[1-9]{4}$/, "Invalid code. Use format ABCD-1234"),
    description: z
      .string()
      .min(1, "Description is too short")
      .max(150, "Description cannot exceed 150 characters"),
    amount: z.coerce.number().min(1, "Enter a valid amount"),
    currency: z.string().min(1, "Currency is required"),
    validityStart: z.string().refine((date: string) => {
      const d = new Date(date);
      const min = new Date();
      min.setDate(min.getDate() + 15);
      return d >= min;
    }, "Start date must be at least 15 days in the future"),
    validityEnd: z.string(),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.validityStart);
    const end = new Date(data.validityEnd);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

    const msInYear = 1000 * 60 * 60 * 24 * 365.25;
    const years = (end.getTime() - start.getTime()) / msInYear;

    if (years < 1 || years > 3) {
      ctx.addIssue({
        path: ["validityEnd"],
        code: z.ZodIssueCode.custom,
        message:
          "Validity period must be between 1 and 3 years from start date",
      });
    }
  });

export const defaultValues: FinancingFormValues = {
  fullName: "",
  country: "",
  projectCode: "",
  description: "",
  amount: 0,
  currency: "",
  validityStart: "",
  validityEnd: "",
};
