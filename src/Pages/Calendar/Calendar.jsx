import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import NavBar from "../../components/NavBar/NavBar";
const Calendar = () => {
  return (
    <>
      <NavBar />
      <LeftSideNav />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </>
  );
};

export default Calendar;
