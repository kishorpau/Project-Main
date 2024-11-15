import NavBar from "../../components/NavBar/NavBar";
import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import { LeftSideNavPages } from "../../components/LeftSideNav/LeftSideNavPages";
import { Typography } from "@mui/material";
const PersonForm = () => {
  return (
    <>
      <NavBar />
      <LeftSideNav navItems={LeftSideNavPages}>
        <Typography variant="h6">Sorry! Page Not Found</Typography>
      </LeftSideNav>
    </>
  );
};

export default PersonForm;
