import NavBar from "../../components/NavBar/NavBar";
import AdminLeftSideNav from "../SuperAdmin/AdminLeftSideNav/AdminLeftSideNav";
import DummyOfficeData from "../SuperAdmin/DummyOfficeData";
const Offices = () => {
  return (
    <>
      <NavBar />
      <AdminLeftSideNav>
        <DummyOfficeData />
      </AdminLeftSideNav>
    </>
  );
};

export default Offices;
