
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
import { ExpenseType,  TransactionGenre } from "../types";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";
import useYearTransactions from "../hooks/useYearTransactions";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);



const GenreChart = () => {
  const {isLoading} = useAppContext()
  const monthlyTransactions = useMonthlyTransactions();
    const yearTransactions = useYearTransactions();
  const theme = useTheme()
  const [selectedType, setSelectedType] = useState<ExpenseType>("monthExpense");

  

  const handleChange = (e: SelectChangeEvent<ExpenseType>) => {
    setSelectedType(e.target.value as ExpenseType);
  };

  const monthlyGenreSums = monthlyTransactions.reduce<
    Record<TransactionGenre, number>
  >((acc, transaction) => {
    if (!acc[transaction.genre]) {
      acc[transaction.genre] = 0;
    }
    acc[transaction.genre] += 1;
    return acc;
  }, {} as Record<TransactionGenre, number>);

  const yearGenreSums = yearTransactions.reduce<
    Record<TransactionGenre, number>
  >((acc, transaction) => {
    if (!acc[transaction.genre]) {
      acc[transaction.genre] = 0;
    }
    acc[transaction.genre] += 1;
    return acc;
  }, {} as Record<TransactionGenre, number>);

  const monthGenreLabels = Object.keys(monthlyGenreSums) as (TransactionGenre)[];
  const monthGenreValue = Object.values(monthlyGenreSums);

  const yearGenreLabels = Object.keys(yearGenreSums) as (TransactionGenre)[];
  const yearGenreValue = Object.values(yearGenreSums);

  

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const genreColor: Record<TransactionGenre, string> = {
    "カジュアル": theme.palette.genreColor.カジュアル,
   "きれいめ": theme.palette.genreColor.きれいめ, 
   "ストリート": theme.palette.genreColor.ストリート,
   "アウトドア・テック": theme.palette.genreColor.アウトドア・テック,
   "モード": theme.palette.genreColor.モード,
   "ミリタリー": theme.palette.genreColor.ミリタリー,
   "韓国": theme.palette.genreColor.韓国,
  }

  const monthData = {
    labels: monthGenreLabels,
    datasets: [
      {
        data: monthGenreValue,

        backgroundColor: monthGenreLabels.map((genre) => {
          return genreColor[genre]
        }),

        borderColor: monthGenreLabels.map((genre) => {
          return genreColor[genre]
        }),
        borderWidth: 1,
      },
    ],
  };
  const yearData = {
    labels: yearGenreLabels,
    datasets: [
      {
        data: yearGenreValue,
        backgroundColor: yearGenreLabels.map((genre) => {
          return genreColor[genre]
        }),
        borderColor: yearGenreLabels.map((genre) => {
          return genreColor[genre]
        }),
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-select-label">ジャンル</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          label="ジャンル"
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

export default GenreChart;
