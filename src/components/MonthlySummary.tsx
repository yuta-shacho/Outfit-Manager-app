import { Card, CardContent, Grid2, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import React from "react";

import {
  totalMonthExpense,
  totalYearExpense,
} from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";
import useYearTransactions from "../hooks/useYearTransactions";

const MonthlySummary = () => {
  const monthlyTransactions = useMonthlyTransactions();
  const yearTransactions = useYearTransactions();
  const monthExpense = totalMonthExpense(monthlyTransactions);
  const yearExpense = totalYearExpense(yearTransactions);

  return (
    <Grid2 container spacing={{ xs: 1, sm: 2 }} mb={2} columns={16}>
      {/* 月の出費 */}
      <Grid2 size={8} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.monthExpenseColor.light,
            color: "white",
            borderRadius: "15px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <KeyboardArrowDownIcon sx={{ fontSize: "2rem" }} />
              <Typography>今月の服代</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
              }}
            >
              ¥{formatCurrency(monthExpense.monthExpense)}
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      {/* 年の出費 */}
      <Grid2 size={8} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.yearExpenseColor.light,
            color: "white",
            borderRadius: "15px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <KeyboardDoubleArrowDownIcon sx={{ fontSize: "2rem" }} />
              <Typography>今年の服代</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
              }}
            >
              ¥{formatCurrency(yearExpense.yearExpense)}
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default MonthlySummary;
