import NavBar from "../../components/NavBar/NavBar";
import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import { AdminLeftSideNavPages } from "../SuperAdmin/AdminLeftSideNavPages";
import DummyOfficeData from "../SuperAdmin/DummyOfficeData";
const Offices = () => {
  return (
    <>
      <NavBar />
      <LeftSideNav navItems={AdminLeftSideNavPages}>
        <DummyOfficeData />
      </LeftSideNav>
    </>
  );
};

export default Offices;
