import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import { ExpenseType,TransactionCategory } from "../types";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";
import useYearTransactions from "../hooks/useYearTransactions";

ChartJS.register(ArcElement, Tooltip, Legend);



const CategoryChart = () => {
  const {isLoading} = useAppContext()
  const monthlyTransactions = useMonthlyTransactions();
    const yearTransactions = useYearTransactions();
  const theme = useTheme()
  const [selectedType, setSelectedType] = useState<ExpenseType>("monthExpense");

  console.log(monthlyTransactions);

  const handleChange = (e: SelectChangeEvent<ExpenseType>) => {
    setSelectedType(e.target.value as ExpenseType);
  };

  const monthlyCategorySums = monthlyTransactions.reduce<
    Record<TransactionCategory, number>
  >((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += 1;
    return acc;
  }, {} as Record<TransactionCategory, number>);

  const yearCategorySums = yearTransactions.reduce<
    Record<TransactionCategory, number>
  >((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += 1;
    return acc;
  }, {} as Record<TransactionCategory, number>);

  const monthCategoryLabels = Object.keys(monthlyCategorySums) as (TransactionCategory)[];
  const monthCategoryValue = Object.values(monthlyCategorySums);

  const yearCategoryLabels = Object.keys(yearCategorySums) as (TransactionCategory)[];
  const yearCategoryValue = Object.values(yearCategorySums);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    // plugins: {
    //   legend: {
    //     position: "left" as const,
    //   },
    //   title: {
    //     display: true,
    //     text: "カテゴリ",
    //   },
    // },
  };

  const categoryColor: Record<TransactionCategory, string> = {
    "トップス": theme.palette.categoryColor.トップス,
    "ジャケット・アウター": theme.palette.categoryColor.ジャケット・アウター,
    "パンツ": theme.palette.categoryColor.パンツ,
    "スカート": theme.palette.categoryColor.スカート,
    "ワンピース": theme.palette.categoryColor.ワンピース,
    "バッグ": theme.palette.categoryColor.バッグ,
    "靴": theme.palette.categoryColor.靴,
    "アクセサリー": theme.palette.categoryColor.アクセサリー,
  }

  const monthData = {
    labels: monthCategoryLabels,
    datasets: [
      {
        data: monthCategoryValue,

        backgroundColor: monthCategoryLabels.map((category) => {
          return categoryColor[category]
        }),

        borderColor: monthCategoryLabels.map((category) => {
          return categoryColor[category]
        }),
        borderWidth: 1,
      },
    ],
  };
  const yearData = {
    labels: yearCategoryLabels,
    datasets: [
      {
        data: yearCategoryValue,
        backgroundColor: yearCategoryLabels.map((category) => {
          return categoryColor[category]
        }),
        borderColor: yearCategoryLabels.map((category) => {
          return categoryColor[category]
        }),
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-select-label">カテゴリ</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          label="カテゴリ"
          onChange={handleChange}
        >
          <MenuItem value="monthExpense">月間</MenuItem>
          <MenuItem value="yearExpense">年間</MenuItem>
        </Select>
      </FormControl>
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
          selectedType === "monthExpense" ? (
            <Pie data={monthData} options={options} />
          ) : (
            <Pie data={yearData} options={options} />
          )
        ) : (
          <Typography>データがありません</Typography>
        )}
      </Box>
    </>
  );
};

export default CategoryChart;
