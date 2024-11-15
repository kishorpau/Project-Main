import NavBar from "../../components/NavBar/NavBar";
import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import DummyData from "../../DummyData";
import { LeftSideNavPages } from "../../components/LeftSideNav/LeftSideNavPages";

const PersonForm = () => {
  return (
    <>
      <NavBar />
      <LeftSideNav navItems={LeftSideNavPages}>
        <DummyData />
      </LeftSideNav>
    </>
  );
};

export default PersonForm;
