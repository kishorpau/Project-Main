import { Dashboard as DashboardIcon } from "@mui/icons-material";
import { Assessment as AnalyticsIcon } from "@mui/icons-material";
import { Build as ToolsIcon } from "@mui/icons-material";
import { Sms as SendSmsIcon } from "@mui/icons-material";
import { History as SmsHistoryIcon } from "@mui/icons-material";
import { CalendarToday as CalendarIcon } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
export const LeftSideNavPages = [
  { text: "Dashboard", path: "Dashboard", icon: <DashboardIcon /> },
  { text: "Analytics", path: "Analytics", icon: <AnalyticsIcon /> },
  { text: "Add a Person", path: "PersonForm", icon: <PersonAddIcon /> },
  { text: "Tools", path: "Tools", icon: <ToolsIcon /> },
  { text: "Send Sms", path: "SendSms", icon: <SendSmsIcon /> },
  { text: "Sms History", path: "SmsHistory", icon: <SmsHistoryIcon /> },
  { text: "Calendar", path: "Calendar", icon: <CalendarIcon /> },
];
