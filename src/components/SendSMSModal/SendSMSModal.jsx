import { Modal } from "@mui/material";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const SendSMSModal = ({
  smsModalOpen,
  smsMessage,
  handleCloseSmsModal,
  handleSendSMSMessage,
  setSmsMessage,
}) => {
  return (
    <Modal open={smsModalOpen} onClose={handleCloseSmsModal}>
      <Box
        sx={{
          p: 3,
          backgroundColor: "white",
          margin: "auto",
          width: 400,
          mt: "20%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Send SMS</Typography>
          <IconButton onClick={handleCloseSmsModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={smsMessage}
          onChange={(e) => setSmsMessage(e.target.value)}
        />
        <Button
          onClick={handleSendSMSMessage}
          variant="contained"
          sx={{ backgroundColor: "#024950", marginTop: "10px" }}
        >
          Send SMS
        </Button>
      </Box>
    </Modal>
  );
};

export default SendSMSModal;
