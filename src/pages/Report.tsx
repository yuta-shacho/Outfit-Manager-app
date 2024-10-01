import { Grid2, Paper } from "@mui/material";

import MonthSelector from "../components/MonthSelector";
import CategoryChart from "../components/CategoryChart";
import GenreChart from "../components/GenreChart";
import ColorChart from "../components/ColorChart";
import BarChart from "../components/BarChart";
import TransactionTable from "../components/TransactionTable";

const Report = () => {
  const commonPaperStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    p: 2,
  };
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <MonthSelector />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Paper sx={commonPaperStyle}>
          <CategoryChart />
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Paper sx={commonPaperStyle}>
          <GenreChart />
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Paper sx={commonPaperStyle}>
          <ColorChart />
        </Paper>
      </Grid2>
      <Grid2 size={12}>
        <Paper sx={commonPaperStyle}>
          <BarChart />
        </Paper>
      </Grid2>
      <Grid2 size={12}>
        <TransactionTable />
      </Grid2>
    </Grid2>
  );
};

export default Report;
