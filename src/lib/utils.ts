import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalaryJerrcoins(eurAmount?: number) {
  if (!eurAmount) return (
    <div className="space-y-1">
      <div className="text-lg font-bold text-primary">Non défini</div>
    </div>
  );
  const jerrcoins = eurAmount * 100; // 1 euro = 100 jerrcoins
  return (
    <div className="space-y-1">
      <div className="text-lg font-bold text-primary">
        {jerrcoins.toLocaleString()} JERR
      </div>
      <div className="text-xs text-muted-foreground">
        {eurAmount.toLocaleString()} € /an
      </div>
    </div>
  );
}

export function formatBudgetJerrcoins(eurAmount?: number) {
  if (!eurAmount) return 'Non défini';
  const jerrcoins = eurAmount * 100; // 1 euro = 100 jerrcoins
  return {
    jerr: `${jerrcoins.toLocaleString()} JERR`,
    eur: `${eurAmount.toLocaleString()} €`
  };
}
