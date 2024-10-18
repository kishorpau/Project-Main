import SelectAllTransferList from "../components/SelectAllTransferList";
import SidePanel from "../components/SidePanel";
import { Box, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar"
const Tools = () => {
  return (
    <>
    <Navbar/>
    
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between", 
        alignItems: "flex-start", 
        padding: 2, 
        gap: 2, 
      }}
    >
      <Box sx={{ flex: 1, maxWidth: { md: "250px" } }}> 
        <SidePanel />
      </Box>

      <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}> 
        <Button variant="contained" sx={{ alignSelf: "flex-start" }}> 
          Create a Group
        </Button>

        
        <SelectAllTransferList />
      </Box>
    </Box>
    </>
  );
};

export default Tools;
