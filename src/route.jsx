import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Analytics from "./Pages/Dashboard/Analytics";
import Groups from "./Pages/Groups/Groups";
import SendSms from "./Pages/SMSManagement/SendSms";
import SmsHistory from "./Pages/SMSManagement/SmsHistory";
import PersonForm from "./Pages/PersonForm/PersonForm";
import Offices from "./Pages/Offices/Offices";
import NotFound from "./Pages/NotFound/NotFound";
import SMSCredit from "./Pages/SMSManagement/SMSCredit/SMSCredit";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminUserList from "./Pages/AdminUserList/AdminUserList";
import Settings from "./Pages/Settings/Settings";
import Profile from "./Pages/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/settings",
    element: (
      <PrivateRoute element={<Settings />} requiredRole={["user", "admin"]} />
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute element={<Profile />} requiredRole={["user", "admin"]} />
    ),
  },

  {
    path: "/Dashboard",
    element: <PrivateRoute element={<Dashboard />} requiredRole="user" />,
  },
  {
    path: "/Analytics",
    element: <PrivateRoute element={<Analytics />} requiredRole="user" />,
  },
  {
    path: "/Groups",
    element: <PrivateRoute element={<Groups />} requiredRole="user" />,
  },
  {
    path: "/SendSms",
    element: <PrivateRoute element={<SendSms />} requiredRole="user" />,
  },
  {
    path: "/SmsHistory",
    element: <PrivateRoute element={<SmsHistory />} requiredRole="user" />,
  },
  {
    path: "/personForm",
    element: <PrivateRoute element={<PersonForm />} requiredRole="user" />,
  },

  {
    path: "/Offices",
    element: <PrivateRoute element={<Offices />} requiredRole="admin" />,
  },
  {
    path: "/User/:Office/",
    element: <PrivateRoute element={<AdminUserList />} requiredRole="admin" />,
  },
  {
    path: "/User/:Office/SMSCredit",
    element: <PrivateRoute element={<SMSCredit />} requiredRole="admin" />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
