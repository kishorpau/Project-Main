
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import NavBar from '../components/NavBar';
import AnchorTemporaryDrawer from "../components/AnchorTemporaryDrawer"
const Calendar = () => {
  return (
    <> <NavBar/>
    <AnchorTemporaryDrawer/>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
    </>
  )
}

export default Calendar;


