import { format } from "date-fns";

export function formatMonth(date: Date): string {
  return format(date, "yyyy-MM");
}

export function formatYear(date: Date): string {
  return format(date, "yyyy");
}

//何円か見やすくする関数
export function formatCurrency(amount: number): string {
  return amount.toLocaleString("ja-JP");
}
