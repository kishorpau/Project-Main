import AnchorTemporaryDrawer from "../components/AnchorTemporaryDrawer";
import NavBar from "../components/NavBar";
import { Button, Card, CardContent, Typography, Modal, Box } from "@mui/material";
import { useState } from "react";
import Data from "../components/DummyData";

const Tools = () => {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <NavBar />
            <AnchorTemporaryDrawer />

            <Card sx={{ maxWidth: 400, margin: '20px auto', boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Groups
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={handleOpen}
                        sx={{ mb: 2, backgroundColor: 'primary.main', color: 'white' }}
                    >
                        Create a new Group
                    </Button>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Center the modal
                    >
                        <Box 
                            sx={{
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                                width: '90vw', 
                                maxWidth: '600px', 
                                maxHeight: '90vh', 
                                overflowY: 'auto', 
                                overflowX:'hidden'
                            }}
                        >
                            <Typography variant="h6" component="h2" gutterBottom>
                                Create Group
                            </Typography>
                            <Data select={true}/>
                        </Box>
                    </Modal>
                </CardContent>
            </Card>
        </>
    );
}

export default Tools;
