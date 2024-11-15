import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import NavBar from "../../components/NavBar/NavBar";
import FormGroupData from "./FormGroupData";
import { LeftSideNavPages } from "../../components/LeftSideNav/LeftSideNavPages";

const Groups = () => {
  return (
    <>
      <NavBar />
      <LeftSideNav navItems={LeftSideNavPages}>
        <FormGroupData />
      </LeftSideNav>
    </>
  );
};

export default Groups;
