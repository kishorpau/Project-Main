import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Analytics from "./Pages/Dashboard/Analytics";
import Groups from "./Pages/Groups/Groups";
import SendSms from "./Pages/SMSManagement/SendSms";
import SmsHistory from "./Pages/SMSManagement/SmsHistory";
import Auth from "./Pages/Auth/Auth";
import PersonForm from "./Pages/PersonForm/PersonForm";
import OfficeAdmin from "./Pages/OfficeAdmin/OfficeAdmin";
import NotFound from "./Pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },

  {
    path: "/Analytics",
    element: <Analytics />,
  },
  {
    path: "/Groups",
    element: <Groups />,
  },

  {
    path: "/SendSms",
    element: <SendSms />,
  },
  {
    path: "/SmsHistory",
    element: <SmsHistory />,
  },
  {
    path: "/Auth",
    element: <Auth />,
  },
  {
    path: "/personForm",
    element: <PersonForm />,
  },
  {
    path: "/OfficeAdmin",
    element: <OfficeAdmin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
