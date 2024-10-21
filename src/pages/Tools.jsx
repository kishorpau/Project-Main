import AnchorTemporaryDrawer from "../components/AnchorTemporaryDrawer";
import NavBar from "../components/NavBar";

import { Button, Card, CardContent, Typography, Modal, Box } from "@mui/material";
import { useState } from "react";

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
                        
                    >
                        <Box 
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                            }}
                        >
                            <Typography>Create a New Group In here</Typography>
                        </Box>
                    </Modal>
                </CardContent>
            </Card>
        </>
    );
}

export default Tools;
