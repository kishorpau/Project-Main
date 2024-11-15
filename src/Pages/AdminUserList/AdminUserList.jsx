import React from "react";
import { useParams } from "react-router-dom";
import AdminUserListDummyData from "../SuperAdmin/AdminUserListDummyData";
import NavBar from "../../components/NavBar/NavBar";
import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import { getAdminUserListPages } from "../SuperAdmin/AdminUserListPages";

const AdminUserList = () => {
  const { Office } = useParams();
  const navItems = getAdminUserListPages(Office);

  return (
    <>
      <NavBar />
      <LeftSideNav navItems={navItems}>
        <AdminUserListDummyData />
      </LeftSideNav>
    </>
  );
};

export default AdminUserList;
