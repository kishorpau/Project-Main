import * as React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const SendSMSModal = ({
  smsModalOpen,
  smsMessage,
  handleCloseSmsModal,
  handleSendSMSMessage,
  setSmsMessage,
}) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [scheduledTime, setScheduledTime] = useState(null);

  const handleScheduleSmsModal = () => {
    setScheduleModalOpen(false);
    setSelectedAction("");
  };

  const handleSMSSchedule = () => {
    setScheduleModalOpen(true);
  };

  const handleDateChange = (date) => {
    setScheduledDate(date);
  };

  const handleTimeChange = (time) => {
    setScheduledTime(time);
  };

  const handleScheduleSmsClick = () => {
    if (scheduledDate && scheduledTime) {
      const scheduledDateTime = scheduledDate
        .hour(scheduledTime.hour())
        .minute(scheduledTime.minute());
      console.log(
        `SMS Scheduled at ${scheduledDateTime.format("YYYY-MM-DD HH:mm:ss")}`
      );
      handleScheduleSmsModal();
    } else {
      console.log("Please select both date and time to schedule the SMS.");
    }
    handleCloseSmsModal();
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    setSelectedAction(action);

    if (action === "schedule") {
      handleSMSSchedule();
    }
  };

  return (
    <>
      <Modal open={smsModalOpen}>
        <Box
          sx={{
            p: 3,
            backgroundColor: "#fff",
            margin: "auto",
            width: 400,
            mt: "20%",
            borderRadius: 2,
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={handleSendSMSMessage}
              variant="contained"
              sx={{ backgroundColor: "#024950" }}
            >
              Send SMS
            </Button>
            <Select
              value={selectedAction}
              onChange={handleActionChange}
              displayEmpty
            >
              <MenuItem value="schedule">Schedule SMS</MenuItem>
            </Select>
          </Box>
        </Box>
      </Modal>

      <Modal open={scheduleModalOpen}>
        <Box
          sx={{
            p: 3,
            backgroundColor: "white",
            margin: "auto",
            width: 500,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h6">Schedule SMS</Typography>
            <IconButton onClick={handleScheduleSmsModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar onChange={handleDateChange} />
            <TimePicker
              label="Select Time"
              value={scheduledTime}
              onChange={handleTimeChange}
            />
          </LocalizationProvider>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              onClick={handleScheduleSmsClick}
              variant="contained"
              sx={{ backgroundColor: "#024950" }}
            >
              Schedule SMS
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SendSMSModal;
