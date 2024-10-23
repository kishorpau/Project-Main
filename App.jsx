import { Typography, Box, Button } from "@mui/material";
import SmsIcon from "@mui/icons-material/Sms";
import { Link } from "react-router-dom";

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
      <Link to="/Auth">
        <Button
          variant="contained"
          sx={{ color: "white", backgroundColor: "#2f575b", fontWeight: "500" }}
        >
          Sign Up
        </Button>
      </Link>
    </Box>
  );
};

export default App;
