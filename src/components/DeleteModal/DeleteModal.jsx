import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const DeleteModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 3,
          backgroundColor: "#fff",
          margin: "auto",
          width: 300,
          mt: "20%",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Confirm Deletion
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Are you sure you want to delete this user?
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{ backgroundColor: "#024950" }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
