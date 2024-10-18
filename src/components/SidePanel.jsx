

import { Drawer, List, ListItem, ListItemIcon, Button,Link } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/system';

const SidePanel= () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#333',
          color: '#fff',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <List>
          
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <DashboardIcon />
            </ListItemIcon>
            <Link href="/Dashboard"><Button variant="contained" sx={{ backgroundColor: '#FF5722', color: '#fff' }}>
              
              Dashboard</Button></Link>
          </ListItem>

          
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <TableChartIcon />
            </ListItemIcon>
            <Link href="/Analytics"><Button variant="contained">Analytics</Button></Link>
          </ListItem>

          
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <ReceiptIcon />
            </ListItemIcon>
            <Link href="/Tools"><Button variant="contained">Tools</Button></Link>
          </ListItem>

        
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <LanguageIcon />
            </ListItemIcon>
            <Link href="/SendSms"><Button variant="contained">Send Sms</Button></Link>
          </ListItem>

          
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <NotificationsIcon />
            </ListItemIcon>
           <Link href="/SmsHistory"><Button variant="contained">Sms History</Button></Link> 
          </ListItem>

       
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <AccountCircleIcon />
            </ListItemIcon>
           <Link href="/Notification"><Button variant="contained">Notification</Button></Link>
          </ListItem>

          
        </List>

       
      </Box>
    </Drawer>
  );
};

export default SidePanel;
