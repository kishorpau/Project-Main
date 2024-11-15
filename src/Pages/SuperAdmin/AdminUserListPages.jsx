import ViewListIcon from "@mui/icons-material/ViewList";
import { CreditScore, LocalPostOffice } from "@mui/icons-material";
export const getAdminUserListPages = (Office) => [
  {
    text: "User List",
    path: `User/${Office}`,
    icon: <ViewListIcon />,
  },
  {
    text: "SMS Credit",
    path: `User/${Office}/SMSCredit`,
    icon: <CreditScore />,
  },
  { text: "Office", path: "Offices", icon: <LocalPostOffice /> },
];
