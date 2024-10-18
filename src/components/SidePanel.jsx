import { Drawer, List, ListItemIcon, ListItemButton } from '@mui/material';
import {
  Dashboard,
  TableChart, 
  Receipt ,
  Language ,
  Notifications, 
  AccountCircle 
} from '@mui/icons-material';
import { Box } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';


const menuItems = [
  { path: '/Dashboard', label: 'Dashboard', icon: <Dashboard /> },
  { path: '/Analytics', label: 'Analytics', icon: <TableChart /> },
  { path: '/Tools', label: 'Tools', icon: <Receipt /> },
  { path: '/SendSms', label: 'Send Sms', icon: <Language /> },
  { path: '/SmsHistory', label: 'Sms History', icon: <Notifications /> },
  { path: '/Notification', label: 'Notification', icon: <AccountCircle /> },
];

const SidePanel = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

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
          height: '75vh',
          marginY: '12.5vh',
          marginLeft: '1%',
          borderRadius: '20px',
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
          {menuItems.map(({ path, label, icon }) => (
            <Link to={path} key={path} style={{ textDecoration: 'none' }}>
              <ListItemButton selected={isActive(path)} sx={{ color: 'white', fontSize: '16px' }}>
                <ListItemIcon sx={{ color: '#fff' }}>{icon}</ListItemIcon>
                {label}
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SidePanel;
