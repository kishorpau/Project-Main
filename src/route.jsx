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
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: "*",
    element: <NotFound />,
  },
]);
