import { useState } from "react";
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
import { ExpenseType, TransactionColor } from "../types";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";
import useYearTransactions from "../hooks/useYearTransactions";

ChartJS.register(ArcElement, Tooltip, Legend);

const ColorChart = () => {
  const { isLoading } = useAppContext();
  const monthlyTransactions = useMonthlyTransactions();
  const yearTransactions = useYearTransactions();
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState<ExpenseType>("monthExpense");

  const handleChange = (e: SelectChangeEvent<ExpenseType>) => {
    setSelectedType(e.target.value as ExpenseType);
  };

  const monthlyColorSums = monthlyTransactions.reduce<
    Record<TransactionColor, number>
  >((acc, transaction) => {
    if (!acc[transaction.color]) {
      acc[transaction.color] = 0;
    }
    acc[transaction.color] += 1;
    return acc;
  }, {} as Record<TransactionColor, number>);

  const yearColorSums = yearTransactions.reduce<
    Record<TransactionColor, number>
  >((acc, transaction) => {
    if (!acc[transaction.color]) {
      acc[transaction.color] = 0;
    }
    acc[transaction.color] += 1;
    return acc;
  }, {} as Record<TransactionColor, number>);

  const monthColorLabels = Object.keys(monthlyColorSums) as TransactionColor[];
  const monthColorValue = Object.values(monthlyColorSums);

  const yearColorLabels = Object.keys(yearColorSums) as TransactionColor[];
  const yearColorValue = Object.values(yearColorSums);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const colorBgColor: Record<TransactionColor, string> = {
    ブラック系: theme.palette.colorBgColor.ブラック系,
    ホワイト系: theme.palette.colorBgColor.ホワイト系,
    グレイ系: theme.palette.colorBgColor.グレイ系,
    ブラウン系: theme.palette.colorBgColor.ブラウン系,
    レッド系: theme.palette.colorBgColor.レッド系,
    ピンク系: theme.palette.colorBgColor.ピンク系,
    パープル系: theme.palette.colorBgColor.パープル系,
    ブルー系: theme.palette.colorBgColor.ブルー系,
    グリーン系: theme.palette.colorBgColor.グリーン系,
    イエロー系: theme.palette.colorBgColor.イエロー系,
    オレンジ系: theme.palette.colorBgColor.オレンジ系,
  };

  const colorBorderColor: Record<TransactionColor, string> = {
    ブラック系: theme.palette.colorBorderColor.ブラック系,
    ホワイト系: theme.palette.colorBorderColor.ホワイト系,
    グレイ系: theme.palette.colorBorderColor.グレイ系,
    ブラウン系: theme.palette.colorBorderColor.ブラウン系,
    レッド系: theme.palette.colorBorderColor.レッド系,
    ピンク系: theme.palette.colorBorderColor.ピンク系,
    パープル系: theme.palette.colorBorderColor.パープル系,
    ブルー系: theme.palette.colorBorderColor.ブルー系,
    グリーン系: theme.palette.colorBorderColor.グリーン系,
    イエロー系: theme.palette.colorBorderColor.イエロー系,
    オレンジ系: theme.palette.colorBorderColor.オレンジ系,
  };

  const monthData = {
    labels: monthColorLabels,
    datasets: [
      {
        data: monthColorValue,

        backgroundColor: monthColorLabels.map((color) => {
          return colorBgColor[color];
        }),

        borderColor: monthColorLabels.map((color) => {
          return colorBorderColor[color];
        }),
        borderWidth: 1,
      },
    ],
  };
  const yearData = {
    labels: yearColorLabels,
    datasets: [
      {
        data: yearColorValue,
        backgroundColor: yearColorLabels.map((color) => {
          return colorBgColor[color];
        }),
        borderColor: yearColorLabels.map((color) => {
          return colorBorderColor[color];
        }),
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-select-label">カラー</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          label="カラー"
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

export default ColorChart;
