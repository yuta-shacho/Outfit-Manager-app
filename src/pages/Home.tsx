import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { format } from "date-fns";

import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";

const Home = () => {
  const { isMobile } = useAppContext();
  const monthlyTransactions = useMonthlyTransactions();

  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //その日の服代取得
  const dailyTransactions = useMemo(() => {
    return monthlyTransactions.filter(
      (transaction) => transaction.date === currentDay
    );
  }, [monthlyTransactions, currentDay]);

  const closeForm = () => {
    if (isMobile) {
      setIsDialogOpen(!isDialogOpen);
    } else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen);
    }
    setSelectedTransaction(null);
  };

  const onAddTransactionForm = () => {
    if (isMobile) {
      setIsDialogOpen(true);
    } else {
      if (selectedTransaction) {
        setSelectedTransaction(null);
      } else {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
      }
    }
  };

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    if (isMobile) {
      setIsDialogOpen(true);
    } else {
      setIsEntryDrawerOpen(true);
    }
  };

  const handleCloseMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
    setIsMobileDrawerOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* 左側コンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary />
        <Calendar
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
          handleDateClick={handleDateClick}
        />
      </Box>

      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onAddTransactionForm={onAddTransactionForm}
          onSelectTransaction={handleSelectTransaction}
          open={isMobileDrawerOpen}
          onClose={handleCloseMobileDrawer}
        />
        <TransactionForm
          onCloseForm={closeForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Box>
    </Box>
  );
};

export default Home;
