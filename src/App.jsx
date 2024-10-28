import { Typography, Box } from "@mui/material";
import SmsIcon from "@mui/icons-material/Sms";
import Auth from "./Pages/Auth/Auth";

const App = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="2%"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#194549"
      color="white"
      height="100vh"
    >
      <Typography align="center" variant="h4">
        <SmsIcon /> Welcome to Bulk Sms
      </Typography>
      <Auth />
    </Box>
  );
};

export default App;
