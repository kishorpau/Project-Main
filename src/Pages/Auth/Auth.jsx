import React from "react";
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
  emailRequired,
  emailInvalid,
  passwordRequired,
  authSuccessMessage,
} from "../../utils/constants/form/index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
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
                required: emailRequired,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: emailInvalid,
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
              {...register("password", { required: passwordRequired })}
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
          severity="success"
          sx={{ width: "100%" }}
        >
          {authSuccessMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Auth;
