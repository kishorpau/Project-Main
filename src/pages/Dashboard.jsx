
import AnchorTemporaryDrawer from "../components/AnchorTemporaryDrawer"
import NavBar from "../components/NavBar"
import UserChart from "../Charts/UserChart"
import { Box, Container } from "@mui/material"

const Dashboard = () => {
  return (
    <>
    <NavBar/>
    <Container sx={{ p: 2, border: '1px dashed grey',display:"flex",justifyContent:"space-evenly" }}>
    <AnchorTemporaryDrawer/>
    
      <UserChart/>
    </Container>

    </>
  )
}

export default Dashboard;



