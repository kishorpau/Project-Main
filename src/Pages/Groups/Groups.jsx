import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import NavBar from "../../components/NavBar/NavBar";
import FormGroupData from "./FormGroupData";

const Groups = () => {
  return (
    <>
      <NavBar />
      <LeftSideNav>
        <FormGroupData />
      </LeftSideNav>
    </>
  );
};

export default Groups;
