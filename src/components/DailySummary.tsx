import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import { theme } from "../theme/theme";
import React from "react";
import { Transaction } from "../types";
import {
  calculateDailyExpense,
  totalMonthExpense,
} from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";

interface DailySummaryProps {
  dailyTransactions: Transaction[];
  isMobile: boolean;
}

const DailySummary = ({ dailyTransactions, isMobile }: DailySummaryProps) => {
  const menuDrawerWidth = 320;
  const dailyExpense = totalMonthExpense(dailyTransactions);

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 width={isMobile ? "1200px" : menuDrawerWidth}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body1" noWrap textAlign="center">
                この日の服代
              </Typography>
              <Typography
                color="#ef5350"
                textAlign={isMobile ? "center" : "right"}
                fontWeight="fontWeightBold"
                sx={{ wordBreak: "break-all" }}
              >
                ¥{formatCurrency(dailyExpense.monthExpense)}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default DailySummary;
