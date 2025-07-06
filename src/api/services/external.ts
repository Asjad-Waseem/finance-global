import axios from "axios";

import { CountryCurrencyData } from "@src/types";

export const getAllCountryCurrencyData = async () => {
  const res = await axios.get<CountryCurrencyData[]>(
    "https://restcountries.com/v3.1/all?fields=currencies"
  );
  return res.data;
};

export const getAllCountries = async () => {
  const res = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,cca2,currencies"
  );
  return res.data;
};
