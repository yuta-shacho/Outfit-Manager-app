import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { formatYear } from "../utils/formatting";
import { Transaction } from "../types";

const useYearTransactions = (): Transaction[] => {
  const { transactions, currentMonth } = useAppContext();
  //今年のデータをすべて取得(ここでエラーが出たらformatYearの引数にnew DateをStateで新しく定義して入れて)
  const yearTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      transaction.date.startsWith(formatYear(currentMonth))
    );
  }, [transactions, currentMonth]);
  return yearTransactions;
};

export default useYearTransactions;
