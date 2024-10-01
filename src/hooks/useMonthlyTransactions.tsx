import { useAppContext } from "../context/AppContext";
import { formatMonth } from "../utils/formatting";
import { Transaction } from "../types";
import { useMemo } from "react";

const useMonthlyTransactions = (): Transaction[] => {
  const { transactions, currentMonth } = useAppContext();
  //今月のデータを取得
  const monthlyTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      transaction.date.startsWith(formatMonth(currentMonth))
    );
  }, [transactions, currentMonth]);

  return monthlyTransactions;
};

export default useMonthlyTransactions;
