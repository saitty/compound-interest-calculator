import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function compoundInterest(principal: number, rate: number, timesCompounded: number, years: number): number {
  return principal * Math.pow((1 + rate / timesCompounded), timesCompounded * years);
}

export function formatCurrency(
  value: number | null | undefined,
  locale: string = 'cs-CZ',
  currency: string = 'CZK'
) {
  return new Intl.NumberFormat(
    locale,
    { 
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
      
    }
  ).format(value ?? 0)
}
