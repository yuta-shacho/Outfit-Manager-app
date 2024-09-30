import { Grid2, Paper } from "@mui/material";

import React from "react";
import MonthSelector from "../components/MonthSelector";
import CategoryChart from "../components/CategoryChart";
import GenreChart from "../components/GenreChart";
import ColorChart from "../components/ColorChart";
import BarChart from "../components/BarChart";
import TransactionTable from "../components/TransactionTable";

// interface ReportProps {
//   currentMonth: Date;
//   setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
//   monthlyTransactions: Transaction[];
//   isLoading: boolean;
//   yearTransactions: Transaction[];
//   onDeleteTransaction: (
//     transactionIds: string | readonly string[]
//   ) => Promise<void>;
// }

const Report = () =>
  //   {
  //   currentMonth,
  //   setCurrentMonth,
  //   monthlyTransactions,
  //   isLoading,
  //   yearTransactions,
  //   onDeleteTransaction,
  // }: ReportProps
  {
    const commonPaperStyle = {
      height: "400px",
      display: "flex",
      flexDirection: "column",
      p: 2,
    };
    return (
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <MonthSelector
          // currentMonth={currentMonth}
          // setCurrentMonth={setCurrentMonth}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Paper sx={commonPaperStyle}>
            <CategoryChart
            // monthlyTransactions={monthlyTransactions}
            // yearTransactions={yearTransactions}
            // isLoading={isLoading}
            />
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Paper sx={commonPaperStyle}>
            <GenreChart
            // monthlyTransactions={monthlyTransactions}
            // yearTransactions={yearTransactions}
            // isLoading={isLoading}
            />
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Paper sx={commonPaperStyle}>
            <ColorChart
            // monthlyTransactions={monthlyTransactions}
            // yearTransactions={yearTransactions}
            // isLoading={isLoading}
            />
          </Paper>
        </Grid2>
        <Grid2 size={12}>
          <Paper sx={commonPaperStyle}>
            <BarChart
            // monthlyTransactions={monthlyTransactions}
            // isLoading={isLoading}
            />
          </Paper>
        </Grid2>
        <Grid2 size={12}>
          <TransactionTable
          // monthlyTransactions={monthlyTransactions}
          // yearTransactions={yearTransactions}
          // onDeleteTransaction={onDeleteTransaction}
          />
        </Grid2>
      </Grid2>
    );
  };

export default Report;
