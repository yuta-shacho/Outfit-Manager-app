import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  Grid2,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
//アイコン
import NotesIcon from "@mui/icons-material/Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DailySummary from "./DailySummary";
import { Transaction } from "../types";
import { formatCurrency } from "../utils/formatting";
import IconComponents from "./common/IconComponents";
import TransactionColorComponents from "./common/TransactionColorComponents";

interface TransactionMenuProps {
  dailyTransactions: Transaction[];
  currentDay: string;
  onAddTransactionForm: () => void;
  onSelectTransaction: (transaction: Transaction) => void;
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
}

const TransactionMenu = ({
  dailyTransactions,
  currentDay,
  onAddTransactionForm,
  onSelectTransaction,
  isMobile,
  open,
  onClose,
}: TransactionMenuProps) => {
  const menuDrawerWidth = 320;
  console.log(dailyTransactions);
  return (
    <Drawer
      sx={{
        width: isMobile ? "auto" : menuDrawerWidth,
        "& .MuiDrawer-paper": {
          width: isMobile ? "auto" : menuDrawerWidth,
          boxSizing: "border-box",
          p: 2,

          ...(isMobile && {
            height: "80vh",
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }),
          ...(!isMobile && {
            top: 64,
            height: `calc(100% - 64px)`,
          }),
        },
      }}
      variant={isMobile ? "temporary" : "permanent"}
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Stack sx={{ height: "100%" }} spacing={2}>
        {/* 日付 */}
        <Typography fontWeight={"fontWeightBold"}>
          日時： {currentDay}
        </Typography>
        {/* 日付の日の服代 */}
        <DailySummary
          dailyTransactions={dailyTransactions}
          isMobile={isMobile}
        />
        {/* 内訳タイトル&内訳追加ボタン */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          {/* 左側のメモアイコンとテキスト */}
          <Box display="flex" alignItems="center">
            <NotesIcon sx={{ mr: 1 }} />
            <Typography variant="body1">内訳</Typography>
          </Box>
          {/* 右側の追加ボタン */}
          <Button
            onClick={onAddTransactionForm}
            startIcon={<AddCircleIcon />}
            color="primary"
          >
            内訳を追加
          </Button>
        </Box>
        {/* 取引一覧 */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List aria-label="取引履歴">
            <Stack spacing={2}>
              {/* ここから取引表示 */}
              {dailyTransactions.map((transaction, index) => (
                <ListItem disablePadding key={index}>
                  <Card
                    sx={{
                      width: "100%",
                      // ここその日の服の色を取得して背景として移す機能をつける
                      backgroundColor:
                        TransactionColorComponents[transaction.color],
                    }}
                    onClick={() => onSelectTransaction(transaction)}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Grid2
                          container
                          spacing={1}
                          alignItems="center"
                          wrap="wrap"
                          columns={12}
                        >
                          <Grid2 size={1}>
                            {/* icon */}
                            {IconComponents[transaction.category]}
                          </Grid2>
                          <Grid2 size={2.5}>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {transaction.category}
                            </Typography>
                          </Grid2>
                          <Grid2 size={4}>
                            <Typography variant="body2" gutterBottom>
                              {transaction.content}
                            </Typography>
                          </Grid2>
                          <Grid2 size={4.5}>
                            <Typography
                              gutterBottom
                              textAlign={"right"}
                              color="text.secondary"
                              sx={{
                                wordBreak: "break-all",
                              }}
                            >
                              ¥{formatCurrency(transaction.amount)}
                            </Typography>
                          </Grid2>
                        </Grid2>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </ListItem>
              ))}
            </Stack>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
};
export default TransactionMenu;
