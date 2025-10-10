export const currencyCodes = [
  'USD', 'EUR', 'JPY', 'GBP', 'CNY', 'AUD',
  'CAD', 'CHF', 'HKD', 'SGD', 'SEK', 'KRW',
  'NOK', 'NZD', 'INR', 'MXN', 'TWD', 'ZAR',
  'BRL', 'DKK', 'PLN', 'THB', 'ILS', 'IDR',
  'CZK', 'AED', 'TRY', 'HUF', 'CLP', 'SAR',
  'PHP', 'MYR', 'COP', 'RUB', 'RON', 'PEN'
] as const;

export type CurrencyCode = typeof currencyCodes[number];