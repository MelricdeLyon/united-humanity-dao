import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalaryJerrcoins(eurAmount?: number) {
  if (!eurAmount) return {
    jerrcoins: 'Non défini',
    euros: ''
  };
  const jerrcoins = eurAmount * 100; // 1 euro = 100 jerrcoins
  return {
    jerrcoins: `${jerrcoins.toLocaleString()} JRC`,
    euros: `${eurAmount.toLocaleString()} €`
  };
}

export function formatMonthlySalaryJerrcoins(eurAmount?: number) {
  if (!eurAmount) return {
    jerrcoins: 'Non défini',
    euros: ''
  };
  const jerrcoins = eurAmount * 100; // 1 euro = 100 jerrcoins
  return {
    jerrcoins: `${jerrcoins.toLocaleString()} JRC`,
    euros: `${eurAmount.toLocaleString()} €`
  };
}

export function formatBudgetJerrcoins(eurAmount?: number) {
  if (!eurAmount) return 'Non défini';
  const jerrcoins = eurAmount * 100; // 1 euro = 100 jerrcoins
  return {
    jerr: `${jerrcoins.toLocaleString()} JERR`,
    eur: `${eurAmount.toLocaleString()} €`
  };
}
