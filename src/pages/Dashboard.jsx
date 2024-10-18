
import SidePanel from "../components/SidePanel"
import NumberGraph from "../charts/NumberGraph"
import { Box } from "@mui/material"
import DonutChart from "../charts/DonutChart"
import Navbar from "../components/Navbar"

const Dashboard = () => {
  return (
    <>
    <Navbar/>
   <Box component="section" sx={{ display:"flex" }}>
   <SidePanel/>
 <NumberGraph/>
 <DonutChart/>
 </Box>
 </>
   
   
  )
}

export default Dashboard