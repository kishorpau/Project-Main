import AnchorTemporaryDrawer from "../components/AnchorTemporaryDrawer"
import NavBar from "../components/NavBar"
import ToolsComponent from "../components/Grid"
import { Button, Card, CardContent,Typography } from "@mui/material"

const Tools = () => {
  return (
    <>
    {/* <NavBar/>
    <AnchorTemporaryDrawer/> */}
    <Card>
        <CardContent>
            <Button variant="contained">
                    Create a new Group
            </Button>
            <Typography variant="h6" >
                Groups
            </Typography>

        </CardContent>
    </Card>
    
            
    
    </>
  )
}

export default Tools;