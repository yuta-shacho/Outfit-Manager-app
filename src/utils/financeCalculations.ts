import { Transaction } from "../types";

export function totalMonthExpense(transactions: Transaction[]): {
  monthExpense: number;
} {
  return transactions.reduce(
    (acc, transaction) => {
      acc.monthExpense += transaction.amount;

      return acc;
    },
    { monthExpense: 0 }
  );
}

export function totalYearExpense(transactions: Transaction[]): {
  yearExpense: number;
} {
  return transactions.reduce(
    (acc, transaction) => {
      acc.yearExpense += transaction.amount;

      return acc;
    },
    { yearExpense: 0 }
  );
}

//日付ごとに月の服代を計算する関数
export function calculateDailyExpense(
  transactions: Transaction[]
): Record<string, { monthExpense: number }> {
  return transactions.reduce<Record<string, { monthExpense: number }>>(
    (acc, transaction) => {
      const day = transaction.date;
      if (!acc[day]) {
        acc[day] = { monthExpense: 0 };
      }

      acc[day].monthExpense += transaction.amount;

      return acc;
    },
    {}
  );
}
