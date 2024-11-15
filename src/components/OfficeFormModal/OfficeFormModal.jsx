import { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";

function OfficeFormModal({
  open,
  handleClose,
  onSubmit,
  defaultValues,
  disabledFields,
}) {
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  useEffect(() => {
    if (defaultValues) {
      setValue("FullName", defaultValues.FullName || "");
      setValue("email", defaultValues.Email || "");
      setValue("PhoneNumber", defaultValues.PhoneNumber || "");
      setValue("Role", defaultValues.Role || "");
      setValue("Status", defaultValues.Status || false);
    } else {
      reset();
    }
  }, [defaultValues, setValue, reset]);

  const isFieldDisabled = (fieldName) =>
    disabledFields && disabledFields.includes(fieldName);

  return (
    <Modal open={open}>
      <Paper
        elevation={3}
        sx={{ p: 2, width: "100%", maxWidth: 700, margin: "auto" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "2%",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
            {defaultValues?.FullName ? "Edit User" : "Add New User"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                {...register("FullName")}
                required
                margin="normal"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label="Email"
                variant="outlined"
                required
                fullWidth
                {...register("email")}
                margin="normal"
                disabled={isFieldDisabled("email")}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                required
                fullWidth
                {...register("PhoneNumber")}
                margin="normal"
              />
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  {...register("Role")}
                  labelId="role-label"
                  label="Role"
                  required
                  value={watch("Role") || ""}
                  disabled={isFieldDisabled("Role")}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth margin="normal">
              <Box sx={{ display: "flex", gap: "1%" }}>
                <Typography variant="h6"> Active Status</Typography>
                <Switch
                  {...register("Status")}
                  checked={!!watch("Status")}
                  color="success"
                  inputProps={{ "aria-label": "controlled" }}
                  disabled={isFieldDisabled("Status")}
                />
              </Box>
            </FormControl>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#024950", maxWidth: 300 }}
            >
              {defaultValues?.FullName ? "Update User" : "Add User"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Modal>
  );
}

export default OfficeFormModal;
