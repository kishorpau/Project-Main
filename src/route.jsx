import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Analytics from "./Pages/Dashboard/Analytics";
import Calendar from "./Pages/Calendar/Calendar";
import Tools from "./Pages/Tools/Tools";
import SendSms from "./Pages/SMSManagement/SendSms";
import SmsHistory from "./Pages/SMSManagement/SmsHistory";
import Auth from "./Pages/Auth/Auth";
import PersonForm from "./Pages/PersonForm/PersonForm";

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
    path: "/Calendar",
    element: <Calendar />,
  },
  {
    path: "/Analytics",
    element: <Analytics />,
  },
  {
    path: "/Tools",
    element: <Tools />,
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
]);
