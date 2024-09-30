import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateDailyExpense } from "../utils/financeCalculations";

import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const { isLoading } = useAppContext();
  const monthlyTransactions = useMonthlyTransactions();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "日別の服代",
      },
    },
  };

  const dailyExpense = calculateDailyExpense(monthlyTransactions);
  console.log(dailyExpense);

  const dateLabels = Object.keys(dailyExpense).sort();
  console.log(dateLabels);

  const expenseData = dateLabels.map((day) => dailyExpense[day].monthExpense);
  console.log(expenseData);

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: "服代",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : monthlyTransactions.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <Typography>データがありません</Typography>
      )}
    </Box>
  );
};

export default BarChart;
