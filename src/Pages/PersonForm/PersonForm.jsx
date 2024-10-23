import NavBar from "../../components/NavBar/NavBar";
import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import DummyData from "../../DummyData";
import { Container } from "@mui/material";

const PersonForm = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ display: "flex", gap: "10%" }}>
        <LeftSideNav />
        <DummyData />
      </Container>
    </>
  );
};

export default PersonForm;
