import { Container } from "@mui/material";
import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import NavBar from "../../components/NavBar/NavBar";
import SendSmsData from "./SendSmsData";

const SendSms = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ display: "flex", gap: "10%" }}>
        <LeftSideNav />
        <SendSmsData />
      </Container>
    </>
  );
};

export default SendSms;
