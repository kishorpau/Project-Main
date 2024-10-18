
import SidePanel from "../components/SidePanel"
import NumberGraph from "../charts/NumberGraph"
import { Box } from "@mui/material"
import DonutChart from "../charts/DonutChart"


const Dashboard = () => {
  return (
    <>
    
   <Box component="section" sx={{ display:"flex" }}>
   <SidePanel/>
 <NumberGraph/>
 <DonutChart/>
 </Box>
 </>
   
   
  )
}

export default Dashboard