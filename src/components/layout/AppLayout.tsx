import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import SideBar from "../common/SideBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useAppContext } from "../../context/AppContext";
import { Transaction } from "../../types";
import { isFireStoreError } from "../../utils/isFireStoreError";

const drawerWidth = 240;

export default function AppLayout() {
  const { setTransactions, setIsLoading } = useAppContext();

  React.useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        console.log(querySnapshot);

        const transactionsDate = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });

        console.log(transactionsDate);
        setTransactions(transactionsDate);
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error("Firebaseのエラーは:", err);
          // console.log(err.message)
          // console.log(err.code)
        } else {
          console.error("一般的なエラーは:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box
      sx={{
        display: { md: "flex" },
        bgcolor: (theme) => theme.palette.grey[100],
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      {/* ヘッダー */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            服ログ
          </Typography>
        </Toolbar>
      </AppBar>

      {/* サイドバー */}
      <SideBar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        handleDrawerClose={handleDrawerClose}
      />

      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
