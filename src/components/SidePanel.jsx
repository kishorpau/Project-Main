

import { Drawer, List, ListItem, ListItemIcon, Button } from '@mui/material';
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
            <Button variant="contained" sx={{ backgroundColor: '#FF5722', color: '#fff' }}>
              
            Dashboard</Button>
          </ListItem>

          
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <TableChartIcon />
            </ListItemIcon>
            <Button variant="contained">Analytics</Button>
          </ListItem>

          
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <ReceiptIcon />
            </ListItemIcon>
            <Button variant="contained">Tools</Button>
          </ListItem>

        
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <LanguageIcon />
            </ListItemIcon>
            <Button variant="contained">Send Sms</Button>
          </ListItem>

          
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <NotificationsIcon />
            </ListItemIcon>
            <Button variant="contained">Sms History</Button>
          </ListItem>

       
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <Button variant="contained">Notification</Button>
          </ListItem>

          
        </List>

       
      </Box>
    </Drawer>
  );
};

export default SidePanel;
