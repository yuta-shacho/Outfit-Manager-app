import * as React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  totalMonthExpense,
  totalYearExpense,
} from "../utils/financeCalculations";
import { Grid2 } from "@mui/material";
import { formatCurrency } from "../utils/formatting";
import IconComponents from "./common/IconComponents";
import { compareDesc, parseISO } from "date-fns";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";
import useYearTransactions from "../hooks/useYearTransactions";

interface TransactionTableHeadProps {
  numSelected: number;

  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;

  rowCount: number;
}

//テーブルヘッド
function TransactionTableHead(props: TransactionTableHeadProps) {
  const {
    onSelectAllClick,

    numSelected,
    rowCount,
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>

        <TableCell>日付</TableCell>
        <TableCell>カテゴリ</TableCell>
        <TableCell>金額</TableCell>
        <TableCell>内容</TableCell>
      </TableRow>
    </TableHead>
  );
}
interface TransactionTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
}
//ツールバーコンポーネント定義
function TransactionTableToolbar(props: TransactionTableToolbarProps) {
  const { numSelected, onDelete } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          月の服代テーブル
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

//ここから本体
export default function TransactionTable() {
  const { onDeleteTransaction } = useAppContext();
  const monthlyTransactions = useMonthlyTransactions();
  const yearTransactions = useYearTransactions();
  const theme = useTheme();

  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = monthlyTransactions.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    onDeleteTransaction(selected);
    setSelected([]);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - monthlyTransactions.length)
      : 0;

  const visibleRows = React.useMemo(() => {
    const sortedMonthlyTransaction = [...monthlyTransactions].sort((a, b) =>
      compareDesc(parseISO(a.date), parseISO(b.date))
    );

    return sortedMonthlyTransaction.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [page, rowsPerPage, monthlyTransactions]);

  const { monthExpense } = totalMonthExpense(monthlyTransactions);
  const { yearExpense } = totalYearExpense(yearTransactions);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Grid2
          container
          sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Grid2 size={6} textAlign={"center"}>
            <Typography variant="subtitle1" component={"div"}>
              月の服代
            </Typography>
            <Typography
              component={"span"}
              fontWeight={"fontWeightBold"}
              sx={{
                color: theme.palette.monthExpenseColor.light,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                wordBreak: "break-word",
              }}
            >
              ￥{formatCurrency(monthExpense)}
            </Typography>
          </Grid2>
          <Grid2 size={6} textAlign={"center"}>
            <Typography variant="subtitle1" component={"div"}>
              今年の服代
            </Typography>
            <Typography
              component={"span"}
              fontWeight={"fontWeightBold"}
              sx={{
                color: theme.palette.yearExpenseColor.light,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                wordBreak: "break-word",
              }}
            >
              ￥{formatCurrency(yearExpense)}
            </Typography>
          </Grid2>
        </Grid2>

        {/* ツールバー */}
        <TransactionTableToolbar
          numSelected={selected.length}
          onDelete={handleDelete}
        />

        {/* 取引一覧 */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TransactionTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={monthlyTransactions.length}
            />
            <TableBody>
              {visibleRows.map((transaction, index) => {
                const isItemSelected = isSelected(transaction.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, transaction.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={transaction.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {transaction.date}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {IconComponents[transaction.category]}
                      {transaction.category}
                    </TableCell>
                    <TableCell align="left">{transaction.amount}</TableCell>
                    <TableCell align="left">{transaction.content}</TableCell>
                    {/* <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* テーブル下部 */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={monthlyTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
