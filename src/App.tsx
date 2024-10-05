import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { Box, CircularProgress, CssBaseline } from "@mui/material";

import FirebaseAuth from "./pages/FirebaseAuth";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { login, logout } from "./redux/userSlice";

function App() {
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
      setIsCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (isCheckingAuth) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {user ? (
            <>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="/report" element={<Report />} />
              </Route>
              <Route path="*" element={<NoMatch />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<FirebaseAuth />} />
              <Route path="*" element={<NoMatch />} />
            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
