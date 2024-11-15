import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import NavBar from "../../components/NavBar/NavBar";
import { LeftSideNavPages } from "../../components/LeftSideNav/LeftSideNavPages";

const SmsHistory = () => {
  return (
    <>
      <NavBar />
      <LeftSideNav navItems={LeftSideNavPages}></LeftSideNav>
    </>
  );
};

export default SmsHistory;
