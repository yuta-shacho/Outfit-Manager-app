import { createContext, ReactNode, useContext, useState } from "react";
import { Transaction } from "../types";
import { useMediaQuery, useTheme } from "@mui/material";
import { Schema } from "../validations/schema";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { isFireStoreError } from "../utils/isFireStoreError";
import { db } from "../firebase";
import { useAppSelector } from "../app/hooks";

interface AppContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  onDeleteTransaction: (
    transactionIds: string | readonly string[]
  ) => Promise<void>;
  handleUpdateTransaction: (
    transaction: Schema,
    transactionId: string
  ) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const user = useAppSelector((state) => state.user);

  //データを保存
  const onSaveTransaction = async (transaction: Schema) => {
    try {
      const docRef = await addDoc(
        collection(db, "users", user?.uid ?? "unknown_user", "Transactions"),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;

      setTransactions((prevTransaction) => [
        ...prevTransaction,
        newTransaction,
      ]);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firebaseのエラーは:", err);
        // console.log(err.message)
        // console.log(err.code)
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  //データを削除
  const onDeleteTransaction = async (
    transactionIds: string | readonly string[]
  ) => {
    try {
      const idsToDelete = Array.isArray(transactionIds)
        ? transactionIds
        : [transactionIds];

      for (const id of idsToDelete) {
        await deleteDoc(
          doc(db, "users", user?.uid ?? "unknown_user", "Transactions", id)
        );
      }
      // const filteredTransaction = transactions.filter(
      //   (transaction) => transaction.id !== transactionIds
      // );
      const filteredTransaction = transactions.filter(
        (transaction) => !idsToDelete.includes(transaction.id)
      );
      console.log(filteredTransaction);
      setTransactions(filteredTransaction);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firebaseのエラーは:", err);
        // console.log(err.message)
        // console.log(err.code)
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  //データを変更
  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      const docRef = doc(
        db,
        "users",
        user?.uid ?? "unknown_user",
        "Transactions",
        transactionId
      );

      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, transaction);

      const updatedTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      setTransactions(updatedTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firebaseのエラーは:", err);
        // console.log(err.message)
        // console.log(err.code)
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        currentMonth,
        setCurrentMonth,
        isLoading,
        setIsLoading,
        isMobile,
        onDeleteTransaction,
        handleUpdateTransaction,
        onSaveTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("ContextAPIのエラー");
  }
  return context;
};
