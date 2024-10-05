import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth, githubProvider, googleProvider } from "../firebase";

const FirebaseAuth = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).catch((err) => {
      alert(err.message);
    });
  };
  const signInWithGithub = () => {
    signInWithPopup(auth, githubProvider).catch((err) => {
      alert(err.message);
    });
  };
  return (
    <Box
      sx={{
        height: "100vh",
        background:
          "linear-gradient(to right, rgba(243, 196, 170, 1), rgba(162, 120, 182, 1), rgba(52, 59, 202, 1))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          padding: 4,
          marginBottom: 3,
          maxWidth: "lg",
          boxShadow: 3,
          bgcolor: "rgba(231, 227, 210, 255)",
          borderRadius: 5,
        }}
      >
        <Stack alignItems="center">
          <img
            src="../../public/rogo.webp"
            alt=""
            style={{ borderRadius: "50%", width: "80px" }}
          />

          <Typography
            variant="h4"
            component="h1"
            sx={{ fontFamily: "Nico Moji", paddingBottom: 3 }}
          >
            ふくログ!!
          </Typography>
          <Typography variant="h4">ログイン</Typography>
          <Typography
            variant="body2"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            Please sign in with your Google or GitHub account！
          </Typography>
        </Stack>

        <Divider sx={{ borderColor: "gray.400" }} />
        <CardContent>
          <Stack spacing={2}>
            <Button
              onClick={signInWithGoogle}
              variant="outlined"
              startIcon={<FcGoogle size="30px" />}
              sx={{
                fontSize: "20px",
                padding: 2,
                borderColor: "gray.400",
                textTransform: "none",
              }}
            >
              Googleでログイン
            </Button>
            <Button
              onClick={signInWithGithub}
              variant="outlined"
              startIcon={<FaGithub size="30px" />}
              sx={{
                fontSize: "20px",
                padding: 2,
                borderColor: "gray.400",
                textTransform: "none",
              }}
            >
              Githubでログイン
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FirebaseAuth;
