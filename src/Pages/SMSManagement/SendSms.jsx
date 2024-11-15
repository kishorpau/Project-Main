import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import NavBar from "../../components/NavBar/NavBar";
import SendSmsData from "./SendSmsData";
import { LeftSideNavPages } from "../../components/LeftSideNav/LeftSideNavPages";

const SendSms = () => {
  return (
    <>
      <NavBar />
      <LeftSideNav navItems={LeftSideNavPages}>
        <SendSmsData />
      </LeftSideNav>
    </>
  );
};

export default SendSms;
