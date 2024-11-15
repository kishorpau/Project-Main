import React, { useState } from "react";
import { Box, Typography, Avatar, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import OfficeFormModal from "../../components/OfficeFormModal/OfficeFormModal";
import NavBar from "../../components/NavBar/NavBar";
const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    FullName: "Shyam Ale",
    Email: "user@gmail.com",
    PhoneNumber: "+09 345 346 46",
    Role: "user",
    Status: true,
    Country: "Nepal",
    City: "Kathmandu, Bagmati",
  });

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (data) => {
    setUserDetails({
      ...userDetails,
      ...data,
    });
    handleCloseModal();
  };

  return (
    <>
      <NavBar />
      <Box padding="20px">
        <Typography variant="h5" fontWeight="bold" marginBottom="20px">
          My Profile
        </Typography>

        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              {" "}
              {/* Here "item" should be boolean */}
              <Avatar sx={{ width: 80, height: 80 }} src="profile" />
            </Grid>
            <Grid item>
              {" "}
              {/* Ensure "item" is a boolean */}
              <Typography variant="h6" fontWeight="bold">
                {userDetails.FullName}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {userDetails.City}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            marginBottom="20px"
          >
            <Typography variant="h6" fontWeight="bold">
              Personal Information
            </Typography>
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {" "}
              <Typography variant="subtitle2" color="textSecondary">
                Full Name
              </Typography>
              <Typography variant="body1">{userDetails.FullName}</Typography>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Typography variant="subtitle2" color="textSecondary">
                Email address
              </Typography>
              <Typography variant="body1">{userDetails.Email}</Typography>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Typography variant="subtitle2" color="textSecondary">
                Phone
              </Typography>
              <Typography variant="body1">{userDetails.PhoneNumber}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ padding: "20px" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            marginBottom="20px"
          >
            <Typography variant="h6" fontWeight="bold">
              Address
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {" "}
              <Typography variant="subtitle2" color="textSecondary">
                Country
              </Typography>
              <Typography variant="body1">{userDetails.Country}</Typography>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Typography variant="subtitle2" color="textSecondary">
                City/State
              </Typography>
              <Typography variant="body1">{userDetails.City}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <OfficeFormModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          defaultValues={{
            FullName: userDetails.FullName,
            PhoneNumber: userDetails.PhoneNumber,
            Email: userDetails.Email,
            Role: userDetails.Role,
          }}
          disabledFields={["email", "Role", "Status"]}
        />
      </Box>
    </>
  );
};

export default Profile;
