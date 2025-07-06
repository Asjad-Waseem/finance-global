import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { getAllCountryCurrencyData } from "@src/api/services/external";

import { OPEC_CODES, USD } from "@src/utils/constants";
import { CountryCurrencyData } from "@src/types";
import { CurrencyInfo } from "./types";

const CurrencySelector = ({ countryCode }: { countryCode: string }) => {
  const { register, setValue } = useFormContext();
  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([]);

  useEffect(() => {
    getAllCountryCurrencyData().then((data: CountryCurrencyData[]) => {
      const allCurrencies: { code: string; name: string }[] = [];
      data?.forEach((country) => {
        if (country?.currencies) {
          Object?.entries(country?.currencies)?.forEach(([code, { name }]) => {
            allCurrencies?.push({ code, name });
          });
        }
      });
      const unique = Array?.from(
        new Map(allCurrencies?.map((c) => [c?.code, c]))?.values()
      );
      setCurrencies(unique?.sort((a, b) => a?.code?.localeCompare(b?.code)));
    });
  }, []);

  const isOPEC = OPEC_CODES?.includes(countryCode);

  useEffect(() => {
    if (isOPEC) setValue("currency", USD);
  }, [countryCode]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="currency" className="font-semibold text-sm">
        Currency<span className="text-red-500 ml-1">* </span>
      </label>
      <select
        {...register("currency")}
        className="border px-3 py-2 rounded-md bg-white"
      >
        <option value="">Select Currency</option>
        {currencies?.map((c) => (
          <option
            key={c?.code}
            value={c?.code}
            disabled={isOPEC && c?.code !== USD}
          >
            {c?.name} ({c?.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
