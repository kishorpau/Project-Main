import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import NavBar from "../../components/NavBar/NavBar";
import SendSmsData from "./SendSmsData";

const SendSms = () => {
  return (
    <>
      <NavBar />
      <LeftSideNav>
        <SendSmsData />
      </LeftSideNav>
    </>
  );
};

export default SendSms;
