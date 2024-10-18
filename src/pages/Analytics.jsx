import ProductTrendsChart from "../charts/ProductTrendChart"
import TrafficSourcesChart from "../charts/TrafficSourceChart"
import SidePanel from "../components/SidePanel"
import { Box } from "@mui/material"
import Navbar from "../components/Navbar"

const Analytics = () => {
  return (
    <>
    <Navbar/>
    <Box component="section" sx={{ display:"flex", justifyContent:"space-evenly" }}>
   <SidePanel/>
    <ProductTrendsChart/>
    <TrafficSourcesChart/>
 </Box>
 </>
  )
}

export default Analytics