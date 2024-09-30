import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Transaction } from "./types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { formatMonth, formatYear } from "./utils/formatting";
import { Schema } from "./validations/schema";
import { AppContextProvider } from "./context/AppContext";

function App() {
  //Firestoreエラーかどうかを判断する型ガード
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object" && err !== null && "code" in err;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        console.log(querySnapshot);

        const transactionsDate = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });

        console.log(transactionsDate);
        setTransactions(transactionsDate);
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error("Firebaseのエラーは:", err);
          // console.log(err.message)
          // console.log(err.code)
        } else {
          console.error("一般的なエラーは:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  //今月のデータを取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  //今年のデータをすべて取得(ここでエラーが出たらformatYearの引数にnew DateをStateで新しく定義して入れて)
  const yearTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatYear(currentMonth));
  });

  //入力を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    console.log(transaction);
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;

      console.log(newTransaction);

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

  //取引を削除
  const onDeleteTransaction = async (
    transactionIds: string | readonly string[]
  ) => {
    try {
      const idsToDelete = Array.isArray(transactionIds)
        ? transactionIds
        : [transactionIds];
      console.log(idsToDelete);

      for (const id of idsToDelete) {
        await deleteDoc(doc(db, "Transactions", id));
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

  //取引を変更
  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);

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
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route
                index
                element={
                  <Home
                    monthlyTransactions={monthlyTransactions}
                    yearTransactions={yearTransactions}
                    setCurrentMonth={setCurrentMonth}
                    onSaveTransaction={handleSaveTransaction}
                    onDeleteTransaction={onDeleteTransaction}
                    handleUpdateTransaction={handleUpdateTransaction}
                  />
                }
              />
              <Route
                path="/report"
                element={
                  <Report
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    monthlyTransactions={monthlyTransactions}
                    isLoading={isLoading}
                    yearTransactions={yearTransactions}
                    onDeleteTransaction={onDeleteTransaction}
                  />
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
