
import AnchorTemporaryDrawer from "../components/AnchorTemporaryDrawer"
import NavBar from "../components/NavBar"
import UserChart from "../Charts/UserChart"
import { Box } from "@mui/material"

const Dashboard = () => {
  return (
    <>
    <NavBar/>
    <AnchorTemporaryDrawer/>
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <UserChart/>
    </Box>

    </>
  )
}

export default Dashboard;



