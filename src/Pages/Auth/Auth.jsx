import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  AUTH_SUCCESS_MESSAGE,
} from "../../utils/constants/form/index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const authenticateUser = async (email, password) => {
  if (email === "admin@example.com" && password === "admin") {
    return { role: "admin" };
  } else if (email === "user@example.com" && password === "user") {
    return { role: "user" };
  } else {
    throw new Error("Invalid credentials");
  }
};

const Auth = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(AUTH_SUCCESS_MESSAGE);

  const onSubmit = async (data) => {
    try {
      const response = await authenticateUser(data.email, data.password);
      localStorage.setItem("user", JSON.stringify({ role: response.role }));
      setOpenSnackbar(true);

      if (response.role === "admin") {
        navigate("/Offices");
      } else if (response.role === "user") {
        navigate("/Dashboard");
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#194549"
    >
      <Card sx={{ maxWidth: 400, backgroundColor: "#fff" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              {...register("email", {
                required: EMAIL_REQUIRED,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: EMAIL_INVALID,
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              variant="outlined"
              type="password"
              {...register("password", { required: PASSWORD_REQUIRED })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#2f575b" }}
              >
                Sign In
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbarMessage === AUTH_SUCCESS_MESSAGE ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Auth;
