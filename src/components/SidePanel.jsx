import { Drawer, List, ListItemIcon, ListItemButton } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TableChart as TableChartIcon,
  Receipt as ReceiptIcon,
  Language as LanguageIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { Box } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';

// Define the menu items in a more concise format
const menuItems = [
  { path: '/Dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/Analytics', label: 'Analytics', icon: <TableChartIcon /> },
  { path: '/Tools', label: 'Tools', icon: <ReceiptIcon /> },
  { path: '/SendSms', label: 'Send Sms', icon: <LanguageIcon /> },
  { path: '/SmsHistory', label: 'Sms History', icon: <NotificationsIcon /> },
  { path: '/Notification', label: 'Notification', icon: <AccountCircleIcon /> },
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
          height: '90vh',
          marginY: '5vh',
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
