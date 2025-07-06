export interface FinancingFormValues {
  name: string;
  country: string;
  projectCode: string;
  description: string;
  currency: string;
  amount: number;
  validityStart: string;
  validityEnd: string;
}

export interface CountryCurrencyData {
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol?: string;
    };
  };
}
